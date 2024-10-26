import { CreateProductDto } from "./dto/create-product.dto";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IPagination } from "../shared/common/pagination/index";
import { ListProductsDTO } from "./dto/list-product.dto";
import { ProductDTO } from "./dto/product.dto";
import { ProductRepository } from "./provider/product.repository";

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private productRepository: ProductRepository) {}

  async createProduct(createProductDTO: CreateProductDto): Promise<ProductDTO> {
    this.logger.log(`Creating product with data: ${JSON.stringify(createProductDTO)}`);
    const createdProduct = await this.productRepository.createProduct(createProductDTO);
    this.logger.log(`Product created successfully with ID: ${createdProduct.id}`);
    return createdProduct;
  }

  async findAll(query: ListProductsDTO): Promise<{ products: ProductDTO[]; meta: IPagination }> {
    const result = await this.productRepository.findAll(query);
    this.logger.log(`Fetched ${result.products.length} products.`);
    return result;
  }

  async findOne(id: number): Promise<ProductDTO | null> {
    this.logger.log(`Fetching product with ID: ${id}`);

    const product = await this.productRepository.findOne(id);
    if (!product) {
      this.logger.warn(`No product found with ID: ${id}`);
      throw new NotFoundException(`No product found with id ${id}`);
    }

    this.logger.log(`Product with ID: ${id} found.`);
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    this.logger.log(`Deleting product with ID: ${id}`);

    const product = await this.productRepository.findOne(id);
    if (!product) {
      this.logger.warn(`No product found with ID: ${id} for deletion.`);
      throw new NotFoundException(`No product found with id ${id}`);
    }

    await this.productRepository.deleteProduct(id);
    this.logger.log(`Product with ID: ${id} deleted successfully.`);
  }
}
