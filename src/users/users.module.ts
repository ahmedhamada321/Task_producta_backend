import { Module, forwardRef } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";
import { AuthModule } from "../auth/auth.module";
import { User } from "./entities/users.entity";
import { UserRepository } from "./providers/users.reposirory";
import { UserController } from "./user.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    { useValue: User, provide: "USER_MODEL" },
    UserRepository,
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
