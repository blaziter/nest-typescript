import { Response } from 'express';

import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '@lib/decorator';

import { AppService } from './app.service';

@ApiTags('api/v1')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getInfo(@Res() res: Response) {
    return this.appService.getInfo(res);
  }
}
