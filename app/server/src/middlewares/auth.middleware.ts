import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(_req: Request, _res: Response, next: NextFunction) {
    console.log('AuthMiddleware is Disabled!');
    next();
  }
}
