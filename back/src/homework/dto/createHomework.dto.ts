import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  type: 'choiceFromList' | 'writeWord';

  @IsNotEmpty()
  @IsArray()
  body: [];

  @IsOptional()
  @IsBoolean()
  isPublished: boolean;
}
