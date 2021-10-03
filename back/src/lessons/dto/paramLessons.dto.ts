import {
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class ParamLessonsDto {
  @IsOptional()
  @IsBoolean()
  watched: boolean;

  @IsOptional()
  @IsBoolean()
  block: boolean;
}
