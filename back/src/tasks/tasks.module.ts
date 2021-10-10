import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { UserEntity } from '../user/user.entity';
import { HomeworkEntity } from '../homework/homework.entity';
import { UserService } from '../user/user.service';
import { HomeworkService } from '../homework/homework.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { ConfigService } from '@nestjs/config';
import { LessonsService } from '../lessons/lessons.service';
import { LessonsEntity } from '../lessons/lessons.entity';
import { CoursesService } from '../courses/courses.service';
import { CoursesEntity } from '../courses/courses.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TasksEntity,
      UserEntity,
      LessonsEntity,
      HomeworkEntity,
      CoursesEntity,
    ]),
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    UserService,
    LessonsService,
    HomeworkService,
    ConfigService,
    CoursesService,
    AuthGuard,
  ],
})
export class TasksModule {}
