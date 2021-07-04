import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      return res
        .status(HttpStatus.CREATED)
        .json(await this.usersService.createUser(createUserDto));
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).send('Something bad happened!');
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async removeUser(@Param('id') userId: string) {
    return this.usersService.removeUser(userId);
  }
}
