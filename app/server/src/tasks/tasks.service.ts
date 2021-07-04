import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getAllTasks() {
    return `This action returns all tasks`;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const createdTask = await this.taskRepository.save(createTaskDto);
    if (!createdTask) {
      throw new Error("[App] Can't create Task!");
    }

    console.log('createdTask');
    console.log(createdTask);

    return createdTask;
  }

  async getTaskById(taskId: string) {
    return `This action returns a #${taskId} task`;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async removeTask(id: number) {
    return `This action removes a #${id} task`;
  }
}
