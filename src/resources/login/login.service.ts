import { compare } from 'bcryptjs';
import { config } from 'common/config';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import { UserEntity } from 'resources/users/user.entity';
import { getRepository } from 'typeorm';

const login = async (login: string, password: string): Promise<string> => {
  if (!login || !password) {
    return {
      errorStatus: StatusCodes.UNAUTHORIZED,
    };
  }

  const userRepository = getRepository(UserEntity);

  const user = await userRepository.findOne(
    {
      login,
    },
    { select: ['login', 'password'] }
  );

  if (!user) {
    return {
      errorStatus: StatusCodes.FORBIDDEN,
    };
  }

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    return {
      errorStatus: StatusCodes.UNAUTHORIZED,
    };
  }

  const token = await generateJwt(user);
  return token;
};

const generateJwt = (user) => {
  return sign(
    {
      login: user.login,
      password: user.password,
    },
    config.JWT_SECRET_KEY
  );
};

export const loginService = {
  login,
};
