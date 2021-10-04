import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkEntity } from './homework.entity';
import { HomeworkController } from './homework.controller';
import { HomeworkService } from './homework.service';
import { AuthGuard } from "../user/guards/auth.guard";
import { LessonsService } from "../lessons/lessons.service";
import { LessonsEntity } from "../lessons/lessons.entity";
import { CoursesEntity } from "../courses/courses.entity";
import { CoursesService } from "../courses/courses.service";

@Module({
  imports: [TypeOrmModule.forFeature([HomeworkEntity, LessonsEntity, CoursesEntity])],
  controllers: [HomeworkController],
  providers: [HomeworkService, LessonsService, CoursesService, AuthGuard],
})
export class HomeworkModule {}
