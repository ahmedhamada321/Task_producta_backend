import { Inject, Injectable, Logger } from "@nestjs/common";

import { GlobalConfigDTO } from "../dto/global-config.dto";
import { UpdateGlobalConfigDTO } from "../dto/update.dto";
import { GlobalConfig } from "../entities/global.config";

@Injectable()
export class GlobalConfigRepository {
  logger = new Logger(GlobalConfigRepository.name);
  constructor(@Inject("GLOBAL_CONFIG_MODEL") private model: typeof GlobalConfig) {}

  async getGlobalConfig(): Promise<GlobalConfigDTO> {
    const config = await this.model.findOne({});

    if (config) {
      this.logger.log(`Found Existing Global COnfig ID: ${config.id}`);

      return config.toJSON();
    }

    const newConfig = await this.model.create({ id: 1, updatedAt: "1997-07-07" });

    this.logger.log(`Inserted COnfig ID: ${newConfig.id}`);

    return newConfig.toJSON();
  }

  async update(id: number, dto: UpdateGlobalConfigDTO) {
    this.logger.log(`Updating Global Config`);
    this.model.update(dto, { where: { id } });
  }
}
