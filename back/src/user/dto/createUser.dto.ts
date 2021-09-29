import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  type: 'admin' | 'user' | 'teacher' | 'manager';

  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  phone: number;

  @IsOptional()
  @IsString()
  telegram: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
