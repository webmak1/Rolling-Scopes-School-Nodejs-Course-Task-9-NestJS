import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
// import { IExpressRequest } from 'types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    //const request = context.switchToHttp().getRequest<IExpressRequest>();
    const request = context.switchToHttp().getRequest<any>();

    console.log('MIDDLEWARE');

    if (request.user) {
      return true;
    }
    throw new HttpException('[App] Not authorized', HttpStatus.UNAUTHORIZED);
  }
}
