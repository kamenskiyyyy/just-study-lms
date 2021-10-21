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

  @Get('all')
  @UseGuards(AuthGuard)
  async getAllTasks(): Promise<TasksEntity[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async getTasksUser(@Query('id') userId: number): Promise<TasksEntity[]> {
    return this.tasksService.getTasksUser(userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getCurrentTask(@Query('id') taskId: number): Promise<TasksEntity> {
    return this.tasksService.getCurrentTask(taskId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createTask(
    @Query('homework-id') homeworkId: number,
    @Query('user-id') userId: number,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TasksEntity> {
    return this.tasksService.createTask(homeworkId, userId, createTaskDto);
  }

  @Put()
  @UseGuards(AuthGuard)
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
