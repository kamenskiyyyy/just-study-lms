import { IsBoolean, IsOptional } from 'class-validator';

export class CreateAssignmentDto {
  @IsOptional()
  @IsBoolean()
  watched: boolean;

  @IsOptional()
  @IsBoolean()
  block: boolean;
}
