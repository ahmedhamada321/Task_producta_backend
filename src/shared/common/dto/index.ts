import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class PaginatedDTO {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
