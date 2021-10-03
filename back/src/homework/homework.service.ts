import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { HomeworkEntity } from './homework.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(HomeworkEntity)
    private readonly homeworkRepository: Repository<HomeworkEntity>,
  ) {}

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
