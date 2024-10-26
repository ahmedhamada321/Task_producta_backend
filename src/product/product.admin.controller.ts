import { CreateProductDto } from "./dto/create-product.dto";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { IPagination } from "../shared/common/pagination/index";
import { ListProductsDTO } from "./dto/list-product.dto";
import { ProductDTO } from "./dto/product.dto";
import { ProductService } from "./product.service";

@Controller("admin/product")
export class AdminProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProduct(@Body() createProductDTO: CreateProductDto): Promise<ProductDTO> {
    return this.productService.createProduct(createProductDTO);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: ListProductsDTO): Promise<{ products: ProductDTO[]; meta: IPagination }> {
    return this.productService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<ProductDTO> {
    return this.productService.findOne(id);
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
