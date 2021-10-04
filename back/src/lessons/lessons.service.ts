import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonsEntity } from './lessons.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateLessonsDto } from './dto/createLessons.dto';
import { CoursesService } from '../courses/courses.service';
import { ParamsLessonsDto } from './dto/paramsLessons.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonsEntity)
    private readonly lessonsRepository: Repository<LessonsEntity>,
    private readonly courseService: CoursesService,
  ) {}

  async getAllLessons(courseId: number): Promise<LessonsEntity[]> {
    const course = await this.courseService.findById(courseId)
    return await this.lessonsRepository.find({ where: { course } });
  }

  async createLesson(
    courseId: number,
    createLessonDto: CreateLessonsDto,
  ): Promise<LessonsEntity> {
    const course = await this.courseService.findById(courseId);
    const lesson = new LessonsEntity();
    Object.assign(lesson, createLessonDto);
    lesson.course = course;
    return await this.lessonsRepository.save(lesson);
  }

  async updateLesson(
    courseId: number,
    lessonId: number,
    createLessonDto: CreateLessonsDto,
  ): Promise<LessonsEntity> {
    const course = await this.courseService.findById(courseId);
    const lesson = await this.findById(lessonId);
    Object.assign(lesson, createLessonDto);
    lesson.course = course;
    return await this.lessonsRepository.save(lesson);
  }

  async deleteLesson(lessonId: number): Promise<DeleteResult> {
    const lesson = await this.findById(lessonId);
    return await this.lessonsRepository.delete(lesson);
  }

  async editParamsLesson(
    lessonId: number,
    paramsLesson: ParamsLessonsDto,
  ): Promise<LessonsEntity> {
    const lesson = await this.findById(lessonId);
    Object.assign(lesson, paramsLesson);
    return await this.lessonsRepository.save(lesson);
  }

  async findById(id: number): Promise<LessonsEntity> {
    const lesson = await this.lessonsRepository.findOne(id);
    if (!lesson) {
      throw new HttpException(
        'Урок не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return lesson;
  }
}
