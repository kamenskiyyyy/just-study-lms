import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsOptional()
  @IsString()
  patronymic: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  phone: number;

  @IsOptional()
  @IsEmail()
  email: string;
}
