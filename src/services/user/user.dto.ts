import { OmitType, PickType } from '@nestjs/swagger';

import { BaseCreatedModel, User } from '@lib/model';

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

export class CreateUserResponseDto extends BaseCreatedModel {}
