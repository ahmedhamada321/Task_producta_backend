import { BadRequestException, forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { UserDTO } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";
import { AuthHelper } from "./auth.helper";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(forwardRef(() => UsersService)) private readonly userService: UsersService,
    @Inject(AuthHelper) private readonly authHelper: AuthHelper,
  ) {}

  async login({ userName, password }: LoginDto): Promise<{ authToken: string; user: UserDTO }> {
    const user = await this.userService.findByUserName(userName);

    if (!user?.password) {
      if (user) this.logger.log(`login: User ${user?.id} is trying to login but got Invalid Operation`);
      throw new BadRequestException("Invalid Operation");
    }

    const validPassword = await this.authHelper.comparePassword(password, user.password);

    if (!validPassword) {
      this.logger.log(`login: User ${user?.id} is trying to login but Invalid Password`);
      throw new BadRequestException("Invalid Password");
    }

    const authToken = await this.authHelper.generateAdminToken({ userId: user.id, userName });

    this.logger.log(`login: User ${user?.id} logged in sucessfully`);

    return { user, authToken };
  }
}
