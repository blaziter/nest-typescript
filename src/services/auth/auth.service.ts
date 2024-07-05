import bcrypt from 'bcrypt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import sql from 'sequencework-sql-global';

import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PostgresService } from '@services/postgres/postgres.service';
import { UserService } from '@services/user/user.service';

import {
  UserLoginBodyDto,
  UserLoginResponseDto,
  UserRegisterBodyDto,
  UserRegisterResponseDto,
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
    private userService: UserService,
    private postgresService: PostgresService,
    private jwtService: JwtService
  ) {}

  async login(body: UserLoginBodyDto): Promise<UserLoginResponseDto> {
    const user = await this.userService.findByUsername(body.username);

    return {
      access_token: await this.jwtService.signAsync({
        username: user.username,
        roles: user.roles,
      }),
    };
  }

  async register(body: UserRegisterBodyDto): Promise<UserRegisterResponseDto> {
    const user = await this.userService.findByUsername(body.username);

    if (user.username === body.username) {
      throw new HttpException('Username is taken', 409);
    }

    if (body.password !== body.confirmPassword) {
      throw new HttpException('Passwords do not match', 400);
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(body.password, salt, async (err, hash) => {
        await this.postgresService.query(
          sql`INSERT INTO users (username, password) VALUES (${body.username}, ${hash});`
        );
      });
    });

    return { message: 'User created' };
  }

  async changePassword() {
    throw new NotFoundException();
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (!(await bcrypt.compare(password, user.password)) || !user) {
      this.logger.error('Username or password is invalid');
      throw new UnauthorizedException();
    }

    return { password, ...user };
  }
}
