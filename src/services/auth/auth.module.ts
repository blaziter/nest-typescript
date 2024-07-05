import { Module } from '@nestjs/common';

import { PostgresModule } from '@services/postgres/postgres.module';
import { UserModule } from '@services/user/user.module';

import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, PostgresModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
