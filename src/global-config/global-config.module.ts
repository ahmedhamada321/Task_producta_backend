import { Module } from "@nestjs/common";
import { GlobalConfig } from "./entities/global.config";
import { GlobalConfigService } from "./global-config.service";
import { GlobalConfigRepository } from "./providers/global-config.repository";

@Module({
  controllers: [],
  providers: [{ useValue: GlobalConfig, provide: "GLOBAL_CONFIG_MODEL" }, GlobalConfigRepository, GlobalConfigService],
})
export class GlobalConfigModule {}
