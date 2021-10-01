import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { AuthGuard } from "../user/guards/auth.guard";
import { CoursesEntity } from "./courses.entity";
import { CreateCourseDto } from "./dto/createCourse.dto";
import { RoleAdminGuard } from "../user/guards/roleAdmin.guard";
import { UpdateCourseDto } from "./dto/updateCourse.dto";
import { DeleteResult } from "typeorm";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllCourses(): Promise<CoursesEntity[]> {
    return this.coursesService.getAllCourses();
  }

  @Get("course")
  @UseGuards(AuthGuard)
  async getCourse(@Query("id") courseId: number): Promise<CoursesEntity> {
    return this.coursesService.getCourse(courseId);
  }

  @Post("create")
  @UseGuards(RoleAdminGuard)
  async createCourse(@Body() createCourseDto: CreateCourseDto): Promise<CoursesEntity> {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Put("course")
  @UseGuards(RoleAdminGuard)
  async updateCourse(@Query("id") courseId: number, @Body() updateCourseDto: UpdateCourseDto): Promise<CoursesEntity> {
    return this.coursesService.updateCourse(courseId, updateCourseDto);
  }

  @Delete('course')
  @UseGuards(RoleAdminGuard)
  async deleteCourse(@Query("id") courseId: number): Promise<DeleteResult> {
    return this.coursesService.deleteCourse(courseId);
  }
}
