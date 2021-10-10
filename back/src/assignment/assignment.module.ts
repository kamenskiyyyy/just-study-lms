import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentEntity } from './assignment.entity';
import { UserEntity } from '../user/user.entity';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { UserService } from '../user/user.service';
import { LessonsService } from '../lessons/lessons.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../user/guards/auth.guard';
import { LessonsEntity } from '../lessons/lessons.entity';
import { CoursesService } from '../courses/courses.service';
import { CoursesEntity } from '../courses/courses.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssignmentEntity,
      UserEntity,
      LessonsEntity,
      CoursesEntity,
    ]),
  ],
  controllers: [AssignmentController],
  providers: [
    AssignmentService,
    UserService,
    LessonsService,
    ConfigService,
    CoursesService,
    AuthGuard,
  ],
})
export class AssignmentModule {}
