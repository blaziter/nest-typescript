import { isUUID } from 'class-validator';
import { UUID } from 'crypto';
import sql from 'sequencework-sql-global';

import { HttpException, Injectable } from '@nestjs/common';

import { PostgresService } from '@services/postgres/postgres.service';

import {
  AssignRolesRequestDto,
  AssignRolesResponseDto,
  CreateUserRequestDto,
  CreateUserResponseDto,
  FindAllUsersResponseDto,
  FindUserByIdResponseDto,
  FindUserByUsernameResponseDto,
} from './user.dto';

@Injectable()
export class UserService {
  constructor(private postgresService: PostgresService) {}

  async findAll(): Promise<FindAllUsersResponseDto[]> {
    const users = await this.postgresService.query(
      sql`SELECT id, created_at, created_by, username FROM users;`
    );

    const result = await users.map(async (user) => {
      user.roles = await this.postgresService.query(
        sql`SELECT ur.role_id FROM user_role ur WHERE ur.user_id = ${user.id};`
      );

      return user;
    });

    return Promise.all(result);
  }

  async findOne(userId: UUID): Promise<FindUserByIdResponseDto> {
    if (!isUUID(userId)) {
      throw new HttpException('Invalid user ID', 400);
    }

    const user = await this.postgresService.query(
      sql`SELECT id, created_at, created_by, username FROM users WHERE id = ${userId};`
    );

    if (!user[0]) {
      throw new HttpException('User not found', 404);
    }

    const roles = await this.postgresService.query(
      sql`SELECT ur.role_id FROM user_role ur WHERE ur.user_id = ${userId};`
    );

    return { ...user[0], roles };
  }

  async findByUsername(
    username: string
  ): Promise<FindUserByUsernameResponseDto> {
    const user = await this.postgresService.query(
      sql`SELECT id, username, password FROM users WHERE username = ${username};`
    );

    if (!user[0]) {
      throw new HttpException('User not found', 404);
    }

    const roles = await this.postgresService.query(
      sql`SELECT ur.role_id FROM user_role ur WHERE ur.user_id = ${user[0].id};`
    );

    return { ...user[0], userId: user[0].id, roles };
  }

  async create(body: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const user = await this.postgresService.query(
      sql`SELECT username FROM users WHERE username = ${body.username};`
    );

    if (user[0]) {
      throw new HttpException('Username is taken', 409);
    }

    await this.postgresService.query(
      sql`INSERT INTO users (username, created_by) VALUES (${body.username}, ${body.userId});`
    );

    return { message: 'User created' };
  }

  async assignRoles({
    userId,
    roles,
  }: AssignRolesRequestDto): Promise<AssignRolesResponseDto> {
    if (!isUUID(userId)) {
      throw new HttpException('Invalid user ID', 400);
    }

    const user = await this.postgresService.query(
      sql`SELECT id FROM users WHERE id = ${userId};`
    );

    if (!user[0]) {
      throw new HttpException('User not found', 404);
    }

    const selectedRoles = await this.postgresService.query(
      sql`SELECT id FROM roles WHERE id = ANY(${roles});`
    );

    if (selectedRoles.length !== roles.length) {
      throw new HttpException('Role not found', 404);
    }

    await this.postgresService.query(
      sql`INSERT INTO user_role (user_id, role_id) VALUES (${userId}, ${roles});`
    );

    return { message: 'Roles assigned' };
  }
}
