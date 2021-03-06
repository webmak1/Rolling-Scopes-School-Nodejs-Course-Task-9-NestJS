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
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionFilter } from 'filters/http-exception.filter';
import { AuthGuard } from 'guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async createUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      return res
        .status(HttpStatus.CREATED)
        .send(await this.usersService.createUser(createUserDto));
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.NOT_FOUND).send("[App] Can't create user!");
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async getUserById(@Res() res: Response, @Param('id') userId: string) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(await this.usersService.getUserById(userId));
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.NOT_FOUND).send("[App] Can't create user!");
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
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
  @UseFilters(new HttpExceptionFilter())
  async removeUser(@Param('id') userId: string) {
    return this.usersService.removeUser(userId);
  }
}
