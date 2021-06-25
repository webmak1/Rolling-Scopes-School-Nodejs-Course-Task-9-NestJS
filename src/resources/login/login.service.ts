import { compare } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import { UserEntity } from 'resources/users/user.entity';
import { getRepository } from 'typeorm';

const login = async (login, password): Promise<string> => {
  if (!login || !password) {
    // @ts-ignore
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
    // @ts-ignore
    return {
      errorStatus: StatusCodes.FORBIDDEN,
    };
  }

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    // @ts-ignore
    return {
      errorStatus: StatusCodes.UNAUTHORIZED,
    };
  }

  // delete user.password;
  // return user;

  // @ts-ignore
  const token = await generateJwt(user);
  return token;
};

const generateJwt = (user): string => {
  return sign(
    {
      login: user.login,
      password: user.password,
    },
    // @ts-ignore
    process.env.JWT_SECRET_KEY
  );
};

export const loginService = {
  login,
};
