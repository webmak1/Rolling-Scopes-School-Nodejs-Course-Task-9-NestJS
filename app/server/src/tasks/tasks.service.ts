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
    const tasks = await this.taskRepository.find({});
    return tasks;
  }

  async createTask(boardId: string, createTaskDto: CreateTaskDto) {
    const createdTask = await this.taskRepository.save({
      ...createTaskDto,
      boardId,
    });
    if (!createdTask) {
      throw new Error("[App] Can't create Task!");
    }
    return createdTask;
  }

  async getTaskById(taskId: string) {
    const task = await this.taskRepository.findOne(taskId);
    if (!task) {
      throw new Error('[App] Task not found!');
    }
    return task;
  }

  async updateTask(boardId: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.taskRepository.update(boardId, {
      ...updateTaskDto,
    });
    if (!updatedTask.affected) {
      throw new Error("[App] Can't Update Task!");
    }
    const res = await this.getTaskById(boardId);
    return res;
  }

  async removeTask(taskId: string) {
    const taskDelete = await this.getTaskById(taskId);
    const res = await this.taskRepository.delete(taskId);
    if (!res.affected) {
      throw new Error('[App] Cant Delete Task!');
    }
    return taskDelete;
  }
}
