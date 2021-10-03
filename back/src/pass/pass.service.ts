import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from "typeorm";
import { PassEntity } from './pass.entity';
import { CreatePassDto } from './dto/createPass.dto';
import { UserService } from '../user/user.service';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class PassService {
  constructor(
    @InjectRepository(PassEntity)
    private readonly passRepository: Repository<PassEntity>,
    private readonly userService: UserService,
    private readonly coursesService: CoursesService,
  ) {}

  async getAllPass(): Promise<PassEntity[]> {
    return await this.passRepository.find();
  }

  async getPassUser(userId: number): Promise<PassEntity[]> {
    return await this.passRepository.find({ where: { owner: userId } });
  }

  async payPass(
    courseId: number,
    userId: number,
    createPass: CreatePassDto,
  ): Promise<PassEntity> {
    const course = await this.coursesService.findById(courseId);
    const user = await this.userService.findById(userId);
    const pass = new PassEntity();
    Object.assign(pass, createPass);
    pass.course = course;
    pass.owner = user;
    return await this.passRepository.save(pass);
  }

  async updatePass(passId: number, createPass: CreatePassDto): Promise<PassEntity> {
    const pass = await this.findById(passId);
    Object.assign(pass, createPass);
    return await this.passRepository.save(pass);
  }

  async deletePass(passId: number): Promise<DeleteResult> {
    const pass = await this.findById(passId);
    return await this.passRepository.delete(pass)
  }

  async findById(id: number): Promise<PassEntity> {
    const pass = await this.passRepository.findOne(id);
    if (!pass) {
      throw new HttpException(
        'Абонемент не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return pass;
  }
}
