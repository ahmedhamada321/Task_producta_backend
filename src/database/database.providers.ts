import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { GlobalConfig } from "src/global-config/entities/global.config";
import { User } from "src/users/entities/users.entity";
import { Product } from "../product/entities/product";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",

    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: "mysql",
        logging: false,
        username: configService.get("dbUser"),
        port: configService.get("dbPort"),
        host: configService.get("dbHost"),
        database: configService.get("dbName"),
        password: configService.get("dbPassword"),
      });

      sequelize.addModels([GlobalConfig, User, Product]);

      return sequelize;
    },

    inject: [ConfigService],
  },
];
