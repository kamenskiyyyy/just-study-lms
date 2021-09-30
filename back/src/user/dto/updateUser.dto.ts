import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  secondName: string;

  @IsOptional()
  @IsDate()
  birthDate: Date;

  @IsOptional()
  @IsNumber()
  phone: number;

  @IsOptional()
  @IsString()
  telegram: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
