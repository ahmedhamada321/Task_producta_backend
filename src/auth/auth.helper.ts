import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";

import { AdminTokenPayload } from "./dto/token";

@Injectable()
export class AuthHelper {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async encryptPassword(password: string) {
    return await hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }

  async generateAdminToken(data: AdminTokenPayload) {
    return await this.jwtService.signAsync(data, {
      secret: this.configService.get("jwtSecret"),
      expiresIn: this.configService.get("tokenExpiration"),
    });
  }

  async verifyJWTToken(token: string): Promise<AdminTokenPayload> {
    const decoded = await this.jwtService.verifyAsync(token, { secret: this.configService.get("jwtSecret") });
    return decoded;
  }
}
