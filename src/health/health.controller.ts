import { Controller, Get, Logger } from "@nestjs/common";
import { HealthCheck, HttpHealthIndicator } from "@nestjs/terminus";

@Controller("health")
export class HealthController {
  private logger = new Logger(HealthController.name);
  constructor(private http: HttpHealthIndicator) {}

  @HealthCheck()
  @Get()
  check() {
    this.logger.log(`Checking Health`);
    return this.http.pingCheck("nestjs-docs", "https://docs.nestjs.com");
  }
}
