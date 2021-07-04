import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { config } from 'common/config';
import { verify } from 'jsonwebtoken';

// import { IExpressRequest } from 'types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<any>();
    const response = context.switchToHttp().getResponse<any>();

    console.log('request');
    console.log(request);

    if (!request.headers.authorization) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send('[App] MIDDLEWARE NOT AUTHORIZED');
    }

    const token = request.headers.authorization.split(' ')[1];

    console.log('TOKEN');
    console.log(token);

    try {
      const decode = verify(token, config.JWT_SECRET_KEY);

      console.log('decode');
      console.log(decode);

      if (!decode) {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .send('[App] NOT AUTHORIZED');
      }

      return true;
    } catch (err) {
      // return response
      //   .status(HttpStatus.UNAUTHORIZED)
      //   .send('[App] MIDDLEWARE NOT AUTHORIZED');
      throw new HttpException('[App] Not authorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
