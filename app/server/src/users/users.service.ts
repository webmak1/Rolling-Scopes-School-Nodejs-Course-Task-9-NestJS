import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find({});
    return users;
  }

  async createUser(createUserDto: CreateUserDto) {
    let createdUser = await this.userRepository.save(createUserDto);
    if (!createdUser) {
      throw new Error("[App] Can't create User!");
    }
    const user = await this.getUserById(createdUser.id);
    return user;
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new Error('[App] User not found!');
    }
    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userRepository.update(userId, updateUserDto);
    if (!updateUser.affected) {
      throw new Error("[App] Can't Update User!");
    }
    const updatedUser = await this.getUserById(userId);
    return updatedUser;
  }

  async removeUser(userId: string) {
    const deletedUser = await this.getUserById(userId);

    // DELETE USER FROM TASKS
    // await tasksService.deleteUserFromTasks(userId);

    // DELETE USER
    const res = await this.userRepository.delete(userId);

    if (!res.affected) {
      throw new Error('[App] Cant Delete User!');
    }

    return deletedUser;
  }
}
