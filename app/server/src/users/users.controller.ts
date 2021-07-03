import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      return res
        .status(StatusCodes.CREATED)
        .json(await this.usersService.createUser(createUserDto));
    } catch (err) {
      return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
    }
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.usersService.updateUser(id, updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    return this.usersService.removeUser(userId);
  }
}
