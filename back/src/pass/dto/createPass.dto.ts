import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePassDto {
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsBoolean()
  paid: boolean;

  @IsOptional()
  @IsString()
  comment: string;

  @IsNotEmpty()
  type: 'economy' | 'business' | 'first' | 'standard' | 'premium' | 'vip' | 'speaking';
}
