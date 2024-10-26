import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthHelper } from "./auth.helper";
import { AuthService } from "./auth.service";

@Module({
  imports: [forwardRef(() => UsersModule), JwtModule.register({ secret: "$up3r$3cretA@3t" })],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper],
  exports: [AuthService, AuthHelper],
})
export class AuthModule {}
