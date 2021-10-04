import { IsBoolean, IsOptional } from "class-validator";

export class ParamsHomeworkDto {
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
