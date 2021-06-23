// @ts-check
import { tasksService } from 'resources/tasks/task.service';
import { IUserOutput, User } from 'resources/users/user.model';
import { getRepository } from 'typeorm';
import { UserEntity } from './user.entity';

// GET ALL
const getAll = async (): Promise<IUserOutput[]> => {
  const userRepository = getRepository(UserEntity);
  const users = await userRepository.find({});

  return users.map(User.toResponse);
};

// GET USER BY ID
const get = async (userId: string): Promise<IUserOutput> => {
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne(userId);
  if (!user) {
    throw new Error('[App] User not found!');
  }
  return User.toResponse(user);
};

// CREATE USER
const create = async (
  login: string,
  password: string,
  name: string
): Promise<IUserOutput> => {
  const userRepository = getRepository(UserEntity);

  const user = new UserEntity();
  user.name = name;
  user.login = login;
  user.password = password;

  const createdUser = await userRepository.save(user);
  if (!createdUser) {
    throw new Error("[App] Can't create User!");
  }

  const createdUserResult = await get(createdUser.id.toString());
  return createdUserResult;
};

// UPDATE USER
const update = async (
  userId: string,
  login: string,
  password: string,
  name: string
): Promise<IUserOutput> => {
  const userRepository = getRepository(UserEntity);
  const updatedUser = await userRepository.update(userId, {
    login,
    password,
    name,
  });

  if (!updatedUser.affected) {
    throw new Error("[App] Can't Update User!");
  }

  const updatedUserResult = await get(userId);
  return updatedUserResult;
};

// DELETE USER
const remove = async (userId: string): Promise<IUserOutput> => {
  const userDeleteResult = await get(userId);

  const userRepository = getRepository(UserEntity);
  const res = await userRepository.delete(userId);

  if (!res.affected) {
    throw new Error('[App] Cant Delete User!');
  }

  // DELETE USER FROM TASKS
  await tasksService.deleteUserFromTasks(userId);

  return userDeleteResult;
};

export const usersService = {
  getAll,
  get,
  create,
  update,
  remove,
};
