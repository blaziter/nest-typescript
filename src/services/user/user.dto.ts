import { OmitType, PickType } from '@nestjs/swagger';

import { User } from '@lib/models';

export class FindUserByUsernameResponseDto extends PickType(User, [
  'userId',
  'username',
  'password',
  'roles',
]) {}

export class FindAllUsersResponseDto extends OmitType(User, ['password']) {}

export class FindUserByIdParamsDto extends PickType(User, ['userId']) {}

export class FindUserByUsernameQueryDto extends PickType(User, ['username']) {}

export class FindUserByIdResponseDto extends OmitType(User, ['password']) {}

export class CreateUserRequestDto extends OmitType(User, [
  'password',
  'roles',
]) {}
