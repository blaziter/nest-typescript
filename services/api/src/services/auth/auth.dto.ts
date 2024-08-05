import { ApiProperty, PickType } from '@nestjs/swagger';

import { BaseCreatedModel, User } from '@lib/model';

export class UserLoginBodyDto extends PickType(User, [
  'username',
  'password',
]) {}
export class UserLoginResponseDto {
  @ApiProperty()
  access_token: string;
}

export class UserRegisterBodyDto extends UserLoginBodyDto {
  @ApiProperty()
  confirmPassword: string;
}
export class UserRegisterResponseDto extends BaseCreatedModel {}

export class UserProfileResponseDto extends PickType(User, [
  'userId',
  'username',
  'roles',
]) {
  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}
