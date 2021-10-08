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
import { HomeworkService } from './homework.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { HomeworkEntity } from './homework.entity';
import { RoleAdminGuard } from '../user/guards/roleAdmin.guard';
import { CreateHomeworkDto } from './dto/createHomework.dto';
import { DeleteResult } from 'typeorm';
import { ParamsHomeworkDto } from './dto/paramsHomework.dto';

@Controller('homeworks')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Get('all')
  @UseGuards(AuthGuard)
  async getAllHomeworks(): Promise<HomeworkEntity[]> {
    return this.homeworkService.getAllHomeworks();
  }

  // @Get()
  // @UseGuards(AuthGuard)
  // async getAllHomeworksForUser(@Query('user-id') id: number): Promise<HomeworkEntity> {
  //   return this.homeworkService.getCurrentHomework(id);
  // }

  @Get('homework')
  @UseGuards(AuthGuard)
  async getCurrentHomeworks(@Query('id') id: number): Promise<HomeworkEntity> {
    return this.homeworkService.getCurrentHomework(id);
  }

  @Post()
  @UseGuards(RoleAdminGuard)
  async createHomework(
    @Query('lesson-id') lessonId: number,
    @Body() createHomeworkDto: CreateHomeworkDto,
  ): Promise<HomeworkEntity> {
    return this.homeworkService.createHomework(lessonId, createHomeworkDto);
  }

  @Put()
  @UseGuards(RoleAdminGuard)
  async updateHomework(
    @Query('lesson-id') lessonId: number,
    @Query('homework-id') homeworkId: number,
    @Body() createHomeworkDto: CreateHomeworkDto,
  ): Promise<HomeworkEntity> {
    return this.homeworkService.updateHomework(
      lessonId,
      homeworkId,
      createHomeworkDto,
    );
  }

  @Delete()
  @UseGuards(RoleAdminGuard)
  async deleteHomework(@Query('id') homeworkId: number): Promise<DeleteResult> {
    return this.homeworkService.deleteHomework(homeworkId);
  }

  @Put('params')
  @UseGuards(AuthGuard)
  async editParamsHomework(
    @Query('id') homeworkId: number,
    @Body() paramsHomework: ParamsHomeworkDto,
  ): Promise<HomeworkEntity> {
    return this.homeworkService.editParamsHomework(homeworkId, paramsHomework);
  }
}
