import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { CoursesModule } from './courses/courses.module';
import { PassModule } from './pass/pass.module';
import { LessonsModule } from './lessons/lessons.module';
import { HomeworkModule } from './homework/homework.module';
import { TasksModule } from './tasks/tasks.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    CoursesModule,
    PassModule,
    LessonsModule,
    HomeworkModule,
    TasksModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
