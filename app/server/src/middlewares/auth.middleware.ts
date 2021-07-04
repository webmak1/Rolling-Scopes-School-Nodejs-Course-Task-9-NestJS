import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { config } from 'common/config';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
// import { IExpressRequest } from 'types/expressRequest.interface';
// import { UserService } from 'user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // constructor(private readonly userService: UserService) {}

  // async use(req: IExpressRequest, res: Response, next: NextFunction) {
  async use(req: any, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, config.JWT_SECRET_KEY);

      if (!decode) {
        return res.status(HttpStatus.UNAUTHORIZED).send('[App] NOT AUTHORIZED');
      }

      // const user = await this.userService.findById((decode as any).id);
      // req.user = user;
      next();
    } catch (err) {
      // req.user = null;
      // next();
      return res.status(HttpStatus.UNAUTHORIZED).send('[App] NOT AUTHORIZED');
    }
  }
}
