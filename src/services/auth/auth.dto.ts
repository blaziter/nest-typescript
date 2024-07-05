import { ApiProperty, PickType } from '@nestjs/swagger';

import { User } from '@lib/models';

export class UserLoginBodyDto extends PickType(User, [
  'username',
  'password',
]) {}
export class UserLoginResponseDto {
  access_token: string;
}

export class UserRegisterBodyDto extends UserLoginBodyDto {
  @ApiProperty()
  confirmPassword: string;
}
export class UserRegisterResponseDto {
  message: string;
}

export class UserProfileResponseDto extends PickType(User, [
  'username',
  'roles',
]) {}
