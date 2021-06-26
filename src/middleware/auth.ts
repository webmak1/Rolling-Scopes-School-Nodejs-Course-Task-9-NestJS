import { config } from 'common/config';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { IUserOutput } from 'resources/users/user.model';
import { usersService } from 'resources/users/user.service';

export interface RequestWithUser extends Request {
  user?: IUserOutput;
}

export interface ITokenInterface {
  id: string;
  login: string;
  password: string;
}

// Protect routes
export const protect = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void | Response<string>> => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    }

    const decoded = jwt.verify(token, config.JWT_SECRET_KEY) as ITokenInterface;
    const user = await usersService.get(decoded.id);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    }

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
  }
};
