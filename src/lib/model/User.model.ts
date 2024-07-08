import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

import { ApiProperty } from '@nestjs/swagger';

import { Role } from '@lib/enum';

export class User {
  @ApiProperty()
  @IsUUID()
  userId: UUID;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  @IsUUID()
  created_by: UUID;

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: Role })
  roles: Role[];

  @ApiProperty()
  password: string;
}
