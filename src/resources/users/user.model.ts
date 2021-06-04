// @ts-check

import { v4 as uuidv4 } from 'uuid';

export interface IUserOutput {
  id: string;
  name: string;
  login: string;
}

interface IUserGeneral {
  name: string;
  login: string;
  password: string;
}
export interface IUser extends IUserGeneral {
  id: string;
}

export interface IUserInput extends IUserGeneral {
  id: string | undefined;
}

export class User implements IUser {
  public id;
  public name;
  public login;
  public password;

  constructor({ id = uuidv4(), name, login, password }: IUserInput) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): IUserOutput {
    const { id, name, login } = user;
    const output: IUserOutput = {
      id,
      name,
      login,
    };
    return output;
  }
}
