import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { TasksEntity } from './tasks.entity';
import { RoleAdminGuard } from '../user/guards/roleAdmin.guard';
import { CreateTaskDto } from './dto/createTask.dto';
import { DeleteResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllTasks(): Promise<TasksEntity[]> {
    return this.tasksService.getAllTasks();
  }

  @Get()
  @UseGuards(AuthGuard)
  async getTaskUser(@Query('id') taskId: number): Promise<TasksEntity[]> {
    return this.tasksService.getTaskUser(taskId);
  }

  @Post()
  @UseGuards(RoleAdminGuard)
  async createTask(
    @Query('homework-id') homeworkId: number,
    @Query('user-id') userId: number,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TasksEntity> {
    return this.tasksService.createTask(homeworkId, userId, createTaskDto);
  }

  @Put()
  @UseGuards(RoleAdminGuard)
  async updateTask(
    @Query('id') taskId: number,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TasksEntity> {
    return this.tasksService.updateTask(taskId, createTaskDto);
  }

  @Delete()
  @UseGuards(RoleAdminGuard)
  async deleteTask(@Query('id') taskId: number): Promise<DeleteResult> {
    return this.tasksService.deleteTask(taskId);
  }
}
