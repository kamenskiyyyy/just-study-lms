import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkEntity } from './homework.entity';
import { HomeworkController } from './homework.controller';
import { HomeworkService } from './homework.service';

@Module({
  imports: [TypeOrmModule.forFeature([HomeworkEntity])],
  controllers: [HomeworkController],
  providers: [HomeworkService],
})
export class HomeworkModule {}
