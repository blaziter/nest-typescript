import { Module } from '@nestjs/common';

import { PostgresModule } from '@services/postgres/postgres.module';

import { UserService } from './user.service';

@Module({
  imports: [PostgresModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
