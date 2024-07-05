import { isUUID } from 'class-validator';
import { UUID } from 'crypto';
import sql from 'sequencework-sql-global';

import { HttpException, Injectable } from '@nestjs/common';

import { PostgresService } from '@services/postgres/postgres.service';

import {
  CreateUserRequestDto,
  FindAllUsersResponseDto,
  FindUserByIdResponseDto,
  FindUserByUsernameResponseDto,
} from './user.dto';

@Injectable()
export class UserService {
  constructor(private postgresService: PostgresService) {}

  async findAll(): Promise<FindAllUsersResponseDto> {
    return await this.postgresService.query(
      sql`SELECT id, created_at, username FROM users;`
    );
  }

  async findOne(userId: UUID): Promise<FindUserByIdResponseDto> {
    if (!isUUID(userId)) {
      throw new HttpException('Invalid user ID', 400);
    }

    const user = await this.postgresService.query(
      sql`SELECT id, created_at, username FROM users WHERE id = ${userId};`
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

    return { ...user[0], roles };
  }

  async create(body: CreateUserRequestDto) {
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
}
