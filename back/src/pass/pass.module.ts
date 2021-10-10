import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassEntity } from './pass.entity';
import { PassController } from './pass.controller';
import { PassService } from './pass.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { UserService } from '../user/user.service';
import { CoursesService } from '../courses/courses.service';
import { UserEntity } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';
import { CoursesEntity } from '../courses/courses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PassEntity, UserEntity, CoursesEntity])],
  controllers: [PassController],
  providers: [
    PassService,
    UserService,
    CoursesService,
    AuthGuard,
    ConfigService,
  ],
})
export class PassModule {}
