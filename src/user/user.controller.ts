import { UUID } from 'crypto';

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  FindAllUsersResponseDto,
  FindUserByIdResponseDto,
} from '@services/user/user.dto';
import { UserService } from '@services/user/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, type: FindAllUsersResponseDto })
  findAll(): Promise<FindAllUsersResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, type: FindUserByIdResponseDto })
  findUserById(@Param('id') id: UUID): Promise<FindUserByIdResponseDto> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: CreateUserResponseDto })
  create(@Body() user: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.userService.create(user);
  }
}
