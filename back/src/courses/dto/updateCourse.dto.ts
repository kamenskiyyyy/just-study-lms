import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateCourseDto {
  @IsOptional()
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
