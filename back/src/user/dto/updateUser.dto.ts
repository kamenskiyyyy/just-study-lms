import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

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
  @IsString()
  patronymic: string;

  @IsOptional()
  @IsDate()
  birthDate: Date;

  @IsOptional()
  @IsNumber()
  phone: number;

  @IsOptional()
  @IsEmail()
  email: string;
}
