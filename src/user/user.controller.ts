import { UUID } from 'crypto';

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import {
  CreateUserRequestDto,
  FindAllUsersResponseDto,
  FindUserByIdResponseDto,
} from '@services/user/user.dto';
import { UserService } from '@services/user/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<FindAllUsersResponseDto> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  findUserById(@Param('id') id: UUID): Promise<FindUserByIdResponseDto> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserRequestDto) {
    return this.userService.create(user);
  }
}
