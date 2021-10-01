import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesEntity } from './courses.entity';
import { AuthGuard } from '../user/guards/auth.guard';
import { CoursesService } from "./courses.service";

@Module({
  imports: [TypeOrmModule.forFeature([CoursesEntity])],
  controllers: [CoursesController],
  providers: [CoursesService, AuthGuard]
})
export class CoursesModule {}
