import {
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class ParamsLessonsDto {
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
