import { compare } from 'bcryptjs';
import { config } from 'common/config';
import { sign } from 'jsonwebtoken';
import { UserEntity } from 'resources/users/user.entity';
import { getRepository } from 'typeorm';

const login = async (login: string, password: string): Promise<string> => {
  if (!login || !password) {
    // return {
    //   errorStatus: StatusCodes.UNAUTHORIZED,
    // };

    throw new Error('[App] No Login or Password!');
  }

  const userRepository = getRepository(UserEntity);

  const user = await userRepository.findOne(
    {
      login,
    },
    { select: ['id', 'login', 'password'] }
  );

  if (!user) {
    // return {
    //   errorStatus: StatusCodes.FORBIDDEN,
    // };

    throw new Error('[App] FORBIDDEN!');
  }

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    // return {
    //   errorStatus: StatusCodes.UNAUTHORIZED,
    // };
    throw new Error('[App] UNAUTHORIZED!');
  }

  const token: string = generateJwt(user);
  return token;
};

const generateJwt = (user: UserEntity) => {
  return sign(
    {
      id: user.id,
      login: user.login,
      password: user.password,
    },
    config.JWT_SECRET_KEY
  );
};

export const loginService = {
  login,
};
