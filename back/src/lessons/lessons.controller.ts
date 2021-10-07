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
import { LessonsService } from './lessons.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { LessonsEntity } from './lessons.entity';
import { CreateLessonsDto } from './dto/createLessons.dto';
import { RoleAdminGuard } from '../user/guards/roleAdmin.guard';
import { DeleteResult } from 'typeorm';
import { ParamsLessonsDto } from './dto/paramsLessons.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get('lesson')
  @UseGuards(AuthGuard)
  async getLesson(@Query('id') id: number): Promise<LessonsEntity> {
    return this.lessonsService.getLesson(id);
  }

  @Post()
  @UseGuards(RoleAdminGuard)
  async createLesson(
    @Query('id') courseId: number,
    @Body() createLessonDto: CreateLessonsDto,
  ): Promise<LessonsEntity> {
    return this.lessonsService.createLesson(courseId, createLessonDto);
  }

  @Put()
  @UseGuards(RoleAdminGuard)
  async updateLesson(
    @Query('course-id') courseId: number,
    @Query('lesson-id') lessonId: number,
    @Body() createLessonDto: CreateLessonsDto,
  ): Promise<LessonsEntity> {
    return this.lessonsService.updateLesson(
      courseId,
      lessonId,
      createLessonDto,
    );
  }

  @Delete()
  @UseGuards(RoleAdminGuard)
  async deleteLesson(@Query('id') courseId: number): Promise<DeleteResult> {
    return this.lessonsService.deleteLesson(courseId);
  }

  @Put('params')
  @UseGuards(RoleAdminGuard)
  async editParamsLesson(
    @Query('lesson-id') lessonId: number,
    @Body() paramsLesson: ParamsLessonsDto,
  ): Promise<LessonsEntity> {
    return this.lessonsService.editParamsLesson(lessonId, paramsLesson);
  }
}
