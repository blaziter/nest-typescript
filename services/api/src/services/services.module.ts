import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PostgresModule } from './postgres/postgres.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PostgresModule, UserModule, RoleModule],
  exports: [AuthModule, PostgresModule, UserModule, RoleModule],
})
export class ServicesModule {}
