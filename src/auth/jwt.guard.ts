import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthHelper } from "./auth.helper";

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private readonly authHelper: AuthHelper) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Authorization header not found");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Token not found");
    }

    try {
      const user = await this.authHelper.verifyJWTToken(token);

      if (user) {
        request.user = user;
        return true;
      }
    } catch (err) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
