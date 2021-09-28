import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthGuard } from './guards/auth.guard';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard, ConfigService],
  exports: [UserService],
})
export class UserModule {}
