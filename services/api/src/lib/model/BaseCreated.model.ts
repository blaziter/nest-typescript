import { ApiProperty } from '@nestjs/swagger';

export class BaseCreatedModel {
  @ApiProperty()
  message: string;
}
