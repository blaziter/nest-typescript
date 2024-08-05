import { Response } from 'express';

import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(@Res() res: Response) {
    return res.sendFile('index.html', { root: 'src/public' });
  }
}
