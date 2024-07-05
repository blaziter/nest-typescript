import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PostgresModule } from './postgres/postgres.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PostgresModule, UserModule],
  exports: [AuthModule, PostgresModule, UserModule],
})
export class ServicesModule {}
