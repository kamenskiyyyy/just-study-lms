import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  @IsBoolean()
  watched: boolean;

  @IsOptional()
  @IsBoolean()
  block: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished: boolean;

  @IsNotEmpty()
  @IsString()
  type: 'choiceFromList' | 'writeWord';

  @IsOptional()
  @IsArray()
  body: [];
}
