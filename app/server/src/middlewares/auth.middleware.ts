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
    console.log('AuthMiddleware');

    if (!req.headers.authorization) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send('[App] MIDDLEWARE NOT AUTHORIZED');
    }

    const token = req.headers.authorization.split(' ')[1];

    console.log('TOKEN');
    console.log(token);

    try {
      const decode = verify(token, config.JWT_SECRET_KEY);

      console.log('decode');
      console.log(decode);

      if (!decode) {
        return res.status(HttpStatus.UNAUTHORIZED).send('[App] NOT AUTHORIZED');
      }
      next();
    } catch (err) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send('[App] MIDDLEWARE NOT AUTHORIZED');
    }
  }
}
