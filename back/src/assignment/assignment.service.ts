import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from './assignment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/createAssignment.dto';
import { LessonsService } from '../lessons/lessons.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly assignmentRepository: Repository<AssignmentEntity>,
    private readonly lessonsService: LessonsService,
    private readonly userService: UserService,
  ) {}

  async getAllAssignment(): Promise<AssignmentEntity[]> {
    return await this.assignmentRepository.find();
  }

  async getAssignmentUser(assignmentId: number): Promise<AssignmentEntity> {
    return await this.findById(assignmentId);
  }

  async createAssignment(
    lessonId: number,
    userId: number,
    createAssignmentDto: CreateAssignmentDto,
  ): Promise<AssignmentEntity> {
    const lesson = await this.lessonsService.findById(lessonId);
    const user = await this.userService.findById(userId);
    const assignment = new AssignmentEntity();
    Object.assign(assignment, createAssignmentDto);
    assignment.lesson = lesson;
    assignment.student = user;
    return await this.assignmentRepository.save(assignment);
  }

  async updateAssignment(
    assignmentId: number,
    createAssignmentDto: CreateAssignmentDto,
  ): Promise<AssignmentEntity> {
    const assignment = await this.findById(assignmentId);
    Object.assign(assignment, createAssignmentDto);
    return await this.assignmentRepository.save(assignment);
  }

  async deleteAssignment(assignmentId: number): Promise<DeleteResult> {
    const assignment = await this.findById(assignmentId);
    return await this.assignmentRepository.delete(assignment);
  }

  async findById(id: number): Promise<AssignmentEntity> {
    const assignment = await this.assignmentRepository.findOne(id);
    if (!assignment) {
      throw new HttpException(
        'Назначенный урок не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return assignment;
  }
}
