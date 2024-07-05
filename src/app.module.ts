import { LoggerModule } from 'nestjs-pino';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TerminusModule } from '@nestjs/terminus';

import { ServicesModule } from '@services/services.module';

import { AuthModule } from '@auth';
import { jwtConstants } from '@auth/constants';
import { RolesGuard } from '@auth/roles.guard';
import { HealthController } from '@health/health.controller';
import { UserModule } from '@user';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    JwtModule.register({
      global: true,
      secret: `${jwtConstants.secret}`,
      signOptions: { expiresIn: 60 * 30 },
    }),
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
      gracefulShutdownTimeoutMs: 1000,
    }),
    HttpModule,
    ServicesModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
