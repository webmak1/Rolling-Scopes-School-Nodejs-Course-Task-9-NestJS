import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { config } from 'common/config';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { UserEntity } from 'users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne(
      {
        login: loginDto.login,
      },
      { select: ['id', 'login', 'password'] },
    );
    if (!user) {
      throw new Error('[App] FORBIDDEN!');
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('[App] UNAUTHORIZED!');
    }

    const token: string = generateJwt(user);
    return token;
  }
}

const generateJwt = (user: UserEntity) => {
  return sign(
    {
      id: user.id,
      login: user.login,
      password: user.password,
    },
    config.JWT_SECRET_KEY,
  );
};
