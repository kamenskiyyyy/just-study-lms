import { InjectRepository } from "@nestjs/typeorm";
import { CoursesEntity } from "./courses.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateCourseDto } from "./dto/createCourse.dto";
import { UpdateCourseDto } from "./dto/updateCourse.dto";

export class CoursesService {
  constructor(
    @InjectRepository(CoursesEntity)
    private readonly coursesRepository: Repository<CoursesEntity>) {
  }

  async getAllCourses(): Promise<CoursesEntity[]> {
    return await this.coursesRepository.find();
  }

  async getCourse(courseId: number): Promise<CoursesEntity> {
    return await this.coursesRepository.findOne({ id: courseId });
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<CoursesEntity> {
    const newCourse = new CoursesEntity();
    Object.assign(newCourse, createCourseDto);
    await this.coursesRepository.save(newCourse);
    return newCourse;
  }

  async updateCourse(courseId: number, updateCourseDto: UpdateCourseDto): Promise<CoursesEntity> {
    const currentCourse = await this.coursesRepository.findOne({ id: courseId });
    Object.assign(currentCourse, updateCourseDto);
    return await this.coursesRepository.save(currentCourse);
  }

  async deleteCourse(courseId: number): Promise<DeleteResult> {
    return await this.coursesRepository.delete({ id: courseId });
  }
}
