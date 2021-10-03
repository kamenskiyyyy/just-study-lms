import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  category: [];

  @IsOptional()
  @IsBoolean()
  isPublished: boolean;
}
