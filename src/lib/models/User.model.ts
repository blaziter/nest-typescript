import { UUID } from 'crypto';

import { ApiProperty } from '@nestjs/swagger';

import { Role } from '@lib/enums';

export class User {
  @ApiProperty()
  userId: UUID;

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: Role })
  roles: Role[];

  @ApiProperty()
  password: string;
}
