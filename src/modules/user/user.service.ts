import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(REQUEST) private req: Request,
  ) { }

  getProfile() {
    const { mobile, full_name, created_at } = this.req.user
    return {
      mobile,
      full_name,
      created_at
    }
  }
}
