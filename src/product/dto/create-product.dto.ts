import { IsString, IsBoolean, IsOptional, IsJSON, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  productCode: string;

  @IsString()
  unit: string;

  @IsNumber()
  quantity: number;

  @IsString()
  description: string;

  @IsString()
  descriptionItem: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  item: string;

  @IsBoolean()
  isMandatory: boolean;

  @IsString()
  @IsOptional()
  structuralCode: string;

  @IsOptional()
  @IsString()
  attachments?: string;
}
