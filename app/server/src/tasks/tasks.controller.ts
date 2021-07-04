import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    console.log('HEHE');
    return this.tasksService.getAllTasks();
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    console.log('createTaskDto');
    console.log(createTaskDto);

    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  async getTaskById(@Param('id') taskId: string) {
    return this.tasksService.getTaskById(taskId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    console.log('HEHE');
    return this.tasksService.updateTask(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log('HEHE');
    return this.tasksService.removeTask(+id);
  }
}
