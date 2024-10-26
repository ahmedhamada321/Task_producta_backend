import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
