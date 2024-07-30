import { Module } from '@nestjs/common';

import { ServicesModule } from '@services/services.module';
import { UserService } from '@services/user/user.service';

import { UserController } from './user.controller';

@Module({
  imports: [ServicesModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
