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
import { AssignmentService } from './assignment.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { AssignmentEntity } from './assignment.entity';
import { CreateAssignmentDto } from './dto/createAssignment.dto';
import { RoleAdminGuard } from '../user/guards/roleAdmin.guard';
import { DeleteResult } from 'typeorm';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllAssignment(): Promise<AssignmentEntity[]> {
    return this.assignmentService.getAllAssignment();
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAssignmentUser(
    @Query('id') assignmentId: number,
  ): Promise<AssignmentEntity> {
    return this.assignmentService.getAssignmentUser(assignmentId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createAssignment(
    @Query('lesson-id') assignmentId: number,
    @Query('user-id') userId: number,
    @Body() createAssignmentDto: CreateAssignmentDto,
  ): Promise<AssignmentEntity> {
    return this.assignmentService.createAssignment(
      assignmentId,
      userId,
      createAssignmentDto,
    );
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateAssignment(
    @Query('id') assignmentId: number,
    @Body() createAssignmentDto: CreateAssignmentDto,
  ): Promise<AssignmentEntity> {
    return this.assignmentService.updateAssignment(
      assignmentId,
      createAssignmentDto,
    );
  }

  @Delete()
  @UseGuards(RoleAdminGuard)
  async deleteAssignment(
    @Query('id') assignmentId: number,
  ): Promise<DeleteResult> {
    return this.assignmentService.deleteAssignment(assignmentId);
  }
}
