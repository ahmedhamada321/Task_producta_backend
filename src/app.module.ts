import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bull";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TerminusModule } from "@nestjs/terminus";
import { seconds, ThrottlerModule } from "@nestjs/throttler";
import { redisStore } from "cache-manager-redis-store";
import { Redis } from "ioredis";
import { ThrottlerStorageRedisService } from "nestjs-throttler-storage-redis";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import configuration from "./config/configuration";
import { DatabaseModule } from "./database/database.module";
import { GlobalConfigModule } from "./global-config/global-config.module";
import { HealthModule } from "./health/health.module";
import { ProductModule } from "./product/product.module";
import { SharedModule } from "./shared/shared.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    HttpModule,

    TerminusModule,

    HealthModule,

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: seconds(10),
            limit: 50,
          },
        ],
        storage: new ThrottlerStorageRedisService(
          new Redis({
            db: configService.get("nodeEnv") === "production" ? 0 : 2,
            password: configService.get("REDIS_PASSWORD"),
            host: configService.get("REDIS_HOST"),
            port: configService.get("REIDIS_PORT"),
          }),
        ),
      }),
    }),

    DatabaseModule,

    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        max: 10_000,
        store: (): any =>
          redisStore({
            database: configService.get("nodeEnv") === "production" ? 0 : 2,
            commandsQueueMaxLength: 10_000,
            password: configService.get("REDIS_PASSWORD"),
            socket: {
              host: configService.get("REDIS_HOST"),
              port: configService.get("REIDIS_PORT"),
            },
          }),
      }),
    }),

    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get("REDIS_HOST"),
          port: configService.get("REIDIS_PORT"),
          password: configService.get("REDIS_PASSWORD"),
          database: configService.get("nodeEnv") === "production" ? 0 : 2,
        },
      }),
      inject: [ConfigService],
    }),

    SharedModule,

    GlobalConfigModule,
    AuthModule,

    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
