import { config } from 'common/config';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { usersService } from 'resources/users/user.service';

// Protect routes
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    const user = await usersService.get(decoded.id);
    req.user = user;
    // eslint-disable-next-line
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
  }
};
