import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MyLogger } from 'logger';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    MyLogger.log('----------------------------');
    MyLogger.log(`method = ${JSON.stringify(req.method)}`);
    MyLogger.log(`url = ${JSON.stringify(req.url)}`);
    MyLogger.log(`body = ${JSON.stringify(req.body)}`);
    MyLogger.log(`query = ${JSON.stringify(req.query)}`);
    MyLogger.log('----------------------------');
    next();
  }
}
