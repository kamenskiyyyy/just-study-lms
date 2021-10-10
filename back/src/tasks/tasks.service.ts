import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { HomeworkService } from '../homework/homework.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
    private readonly userService: UserService,
    private readonly homeworkService: HomeworkService,
  ) {}

  async getAllTasks(): Promise<TasksEntity[]> {
    return await this.tasksRepository.find();
  }

  async getTaskUser(userId: number): Promise<TasksEntity[]> {
    return await this.tasksRepository.find({ where: { student: userId } });
  }

  async createTask(
    homeworkId: number,
    userId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<TasksEntity> {
    const homework = await this.homeworkService.findById(homeworkId);
    const user = await this.userService.findById(userId);
    const task = new TasksEntity();
    Object.assign(task, createTaskDto);
    task.homework = homework;
    task.student = user;
    return await this.tasksRepository.save(task);
  }

  async updateTask(
    taskId: number,
    createTask: CreateTaskDto,
  ): Promise<TasksEntity> {
    const task = await this.findById(taskId);
    Object.assign(taskId, createTask);
    return await this.tasksRepository.save(task);
  }

  async deleteTask(taskId: number): Promise<DeleteResult> {
    const task = await this.findById(taskId);
    return await this.tasksRepository.delete(task);
  }

  async findById(id: number): Promise<TasksEntity> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new HttpException(
        'Задание не найдено',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return task;
  }
}
