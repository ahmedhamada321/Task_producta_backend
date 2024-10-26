import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ timestamps: true, tableName: "products" })
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  productCode: string;

  @Column(DataType.STRING)
  unit: string;

  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  descriptionItem: string;

  @Column(DataType.STRING)
  category: string;

  @Column(DataType.STRING)
  item: string;

  @Column(DataType.BOOLEAN)
  isMandatory: boolean;

  @Column(DataType.STRING)
  structuralCode: string;

  @Column(DataType.STRING)
  attachments: string;

  createdAt: Date;
  updatedAt: Date;
}
