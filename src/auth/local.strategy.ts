import { Strategy } from 'passport-local';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';

import { isDefined } from '@lib/validator';

import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private moduleRef: ModuleRef
  ) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    username: string,
    password: string
  ): Promise<any> {
    //const contextId = ContextIdFactory.getByRequest(request);
    const user = await this.authService.validateUser(username, password);

    if (isDefined(user)) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
