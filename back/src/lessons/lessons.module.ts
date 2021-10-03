import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsEntity } from './lessons.entity';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { AuthGuard } from "../user/guards/auth.guard";
import { CoursesService } from "../courses/courses.service";
import { CoursesEntity } from "../courses/courses.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LessonsEntity, CoursesEntity])],
  controllers: [LessonsController],
  providers: [LessonsService, CoursesService, AuthGuard],
})
export class LessonsModule {}
