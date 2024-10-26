import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ValidationError } from "class-validator";
import compression from "compression";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { getAllConstraints, getCustomValidationError } from "./shared/common/validation/constrains";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  app.enableCors({
    origin: "*",

    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",

    credentials: true,
  });

  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,

      stopAtFirstError: true,

      forbidUnknownValues: true,

      exceptionFactory: (errors: ValidationError[]) =>
        new HttpException(getCustomValidationError(getAllConstraints(errors)), HttpStatus.UNPROCESSABLE_ENTITY),
    }),
  );

  await app.listen(process.env.PORT || 7000);
}
bootstrap();
