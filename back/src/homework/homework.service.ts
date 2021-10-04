import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeworkEntity } from './homework.entity';
import { DeleteResult, Repository } from 'typeorm';
import { LessonsService } from '../lessons/lessons.service';
import { CreateHomeworkDto } from './dto/createHomework.dto';
import { ParamsHomeworkDto } from "./dto/paramsHomework.dto";

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(HomeworkEntity)
    private readonly homeworkRepository: Repository<HomeworkEntity>,
    private readonly lessonsService: LessonsService,
  ) {}

  async getAllHomeworks(): Promise<HomeworkEntity[]> {
    return await this.homeworkRepository.find();
  }

  async createHomework(
    lessonId: number,
    createHomeworkDto: CreateHomeworkDto,
  ): Promise<HomeworkEntity> {
    const lesson = await this.lessonsService.findById(lessonId);
    const homework = new HomeworkEntity();
    Object.assign(homework, createHomeworkDto);
    homework.lesson = lesson;
    return await this.homeworkRepository.save(homework);
  }

  async updateHomework(
    lessonId: number,
    homeworkId: number,
    createHomeworkDto: CreateHomeworkDto,
  ): Promise<HomeworkEntity> {
    const homework = await this.findById(homeworkId);
    const lesson = await this.lessonsService.findById(lessonId);
    Object.assign(homework, createHomeworkDto);
    homework.lesson = lesson;
    return await this.homeworkRepository.save(homework);
  }

  async deleteHomework(homeworkId: number): Promise<DeleteResult> {
    const homework = await this.findById(homeworkId);
    return await this.homeworkRepository.delete(homework);
  }

  async editParamsHomework(homeworkId: number, paramsHomework: ParamsHomeworkDto): Promise<HomeworkEntity> {
    const homework = await this.findById(homeworkId);
    Object.assign(homework, paramsHomework);
    return await this.homeworkRepository.save(paramsHomework);
  }

  async findById(id: number): Promise<HomeworkEntity> {
    const homework = await this.homeworkRepository.findOne(id);
    if (!homework) {
      throw new HttpException(
        'Домашняя работа не найдена',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return homework;
  }
}
