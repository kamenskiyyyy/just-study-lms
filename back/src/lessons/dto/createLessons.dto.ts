import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLessonsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  numbering: number;

  @IsOptional()
  @IsArray()
  file: string[];

  @IsOptional()
  @IsString()
  body: string;

  @IsOptional()
  @IsBoolean()
  watched: boolean;

  @IsOptional()
  @IsBoolean()
  block: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished: boolean;
}
