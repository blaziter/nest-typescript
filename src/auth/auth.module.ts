import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthService } from '@services/auth/auth.service';
import { ServicesModule } from '@services/services.module';

import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [ServicesModule],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
