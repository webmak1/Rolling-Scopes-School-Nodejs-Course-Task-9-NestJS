// @ts-check

import { DBTasks } from 'common/InMemoryDbTasks';
import { remove } from 'lodash';
import { IUser } from 'resources/users/user.model';

const UsersData: IUser[] = [];

const getAllUsers = (): IUser[] => {
  const res = UsersData.slice(0);
  if (res) {
    return res;
  }
  throw '[App] Null Pointer Exception!';
};

const getUser = (userId: string): IUser => {
  const allUsers = getAllUsers();
  const res = allUsers.filter((el) => el?.id === userId)[0];
  if (res) {
    return res;
  }
  throw '[App] Null Pointer Exception!';
};

const createUser = (user: IUser): IUser => {
  UsersData.push(user);
  const res = getUser(user.id);
  if (res) {
    return res;
  }
  throw '[App] Null Pointer Exception!';
};

const removeUser = (userId: string): IUser => {
  const deletedUser = getUser(userId);
  remove(UsersData, (user) => user.id === userId);
  DBTasks.deleteUserFromTasks(userId);
  const res = deletedUser;
  if (res) {
    return res;
  }
  throw '[App] Null Pointer Exception!';
};

const updateUser = (newUserData: IUser): IUser => {
  removeUser(newUserData.id);
  createUser(newUserData);
  const res = getUser(newUserData.id);
  if (res) {
    return res;
  }
  throw '[App] Null Pointer Exception!';
};

export const DBUsers = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
