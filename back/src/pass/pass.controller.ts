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
import { PassService } from './pass.service';
import { RoleAdminGuard } from '../user/guards/roleAdmin.guard';
import { PassEntity } from './pass.entity';
import { CreatePassDto } from './dto/createPass.dto';
import { AuthGuard } from '../user/guards/auth.guard';
import { DeleteResult } from 'typeorm';

@Controller('pass')
export class PassController {
  constructor(private readonly passService: PassService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllPass(): Promise<PassEntity[]> {
    return this.passService.getAllPass();
  }

  @Get()
  @UseGuards(AuthGuard)
  async getPassUser(@Query('id') userId: number): Promise<PassEntity[]> {
    return this.passService.getPassUser(userId);
  }

  @Post()
  @UseGuards(RoleAdminGuard)
  async payPass(
    @Query('course-id') courseId: number,
    @Query('user-id') userId: number,
    @Body() createPass: CreatePassDto,
  ): Promise<PassEntity> {
    return this.passService.payPass(courseId, userId, createPass);
  }

  @Put()
  @UseGuards(RoleAdminGuard)
  async updatePass(
    @Query('id') passId: number,
    @Body() createPass: CreatePassDto,
  ): Promise<PassEntity> {
    return this.passService.updatePass(passId, createPass);
  }

  @Delete()
  @UseGuards(RoleAdminGuard)
  async deletePass(@Query('id') passId: number): Promise<DeleteResult> {
    return this.passService.deletePass(passId);
  }
}
