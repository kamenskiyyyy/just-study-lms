import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateHomeworkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  prompt: string;

  @IsOptional()
  @IsBoolean()
  done: boolean;

  @IsNotEmpty()
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
