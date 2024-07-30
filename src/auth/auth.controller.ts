import { Request } from 'express';

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@lib/decorator';

import {
  UserLoginBodyDto,
  UserLoginResponseDto,
  UserProfileResponseDto,
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
  @ApiResponse({ status: 201, type: UserLoginResponseDto })
  signIn(@Body() body: UserLoginBodyDto): Promise<UserLoginResponseDto> {
    return this.authService.login(body);
  }

  @Post('register')
  @Public()
  @ApiResponse({ status: 201, type: UserRegisterResponseDto })
  register(
    @Body() body: UserRegisterBodyDto
  ): Promise<UserRegisterResponseDto> {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({ status: 200, type: UserProfileResponseDto })
  getProfile(@Req() req: Request): Express.User | undefined {
    return req.user;
  }
}
