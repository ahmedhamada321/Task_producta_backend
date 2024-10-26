import { Module } from "@nestjs/common";
import { Product } from "./entities/product";
import { AdminProductController } from "./product.admin.controller";
import { ProductService } from "./product.service";
import { ProductRepository } from "./provider/product.repository";

@Module({
  providers: [{ useValue: Product, provide: "PRODUCT_MODEL" }, ProductRepository, ProductService],
  controllers: [AdminProductController],
  exports: [ProductRepository, ProductService],
})
export class ProductModule {}
