import { Inject, Injectable } from "@nestjs/common";
import { IPagination, Pagination } from "src/shared/common/pagination";
import { ListProductsDTO } from "../dto/list-product.dto";
import { ProductDTO } from "../dto/product.dto";
import { Product } from "../entities/product";
import { CreateProductDto } from "./../dto/create-product.dto";

@Injectable()
export class ProductRepository {
  constructor(@Inject("PRODUCT_MODEL") private model: typeof Product) {}

  async createProduct(createProductDTO: CreateProductDto): Promise<Product> {
    return (await this.model.create(createProductDTO)).toJSON();
  }

  async findAll({ page, limit }: ListProductsDTO): Promise<{ products: ProductDTO[]; meta: IPagination }> {
    const paginate = new Pagination(page, limit);

    const { rows: products, count } = await this.model.findAndCountAll({
      offset: paginate.getOffset(),
      limit: paginate.getLimit(),
    });
    return { products: products, meta: paginate.getMetaData(count) };
  }

  async findOne(id: number): Promise<ProductDTO | null> {
    return (await this.model.findOne({ where: { id } }))?.toJSON() || null;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
