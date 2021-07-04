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
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    //console.log('HEHE');
    return this.tasksService.getAllTasks();
  }

  @Post()
  async createTask(
    @Res() res: Response,
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    try {
      // console.log('boardId');
      // console.log(boardId);

      return res
        .status(StatusCodes.CREATED)
        .json(await this.tasksService.createTask(boardId, createTaskDto));
    } catch (err) {
      console.log('CREATE T1');
      console.log(err);
      return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') taskId: string) {
    return this.tasksService.getTaskById(taskId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    //console.log('HEHE');
    return this.tasksService.updateTask(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    //console.log('HEHE');
    return this.tasksService.removeTask(+id);
  }
}
