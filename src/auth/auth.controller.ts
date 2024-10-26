import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
