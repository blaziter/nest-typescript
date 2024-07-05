import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '@lib/decorator';

import {
  UserLoginBodyDto,
  UserLoginResponseDto,
  UserRegisterBodyDto,
  UserRegisterResponseDto,
} from '@services/auth/auth.dto';
import { AuthService } from '@services/auth/auth.service';

import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('login')
  signIn(@Body() body: UserLoginBodyDto): Promise<UserLoginResponseDto> {
    return this.authService.login(body);
  }

  @Post('register')
  @Public()
  register(
    @Body() body: UserRegisterBodyDto
  ): Promise<UserRegisterResponseDto> {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
