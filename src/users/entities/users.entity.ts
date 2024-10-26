import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ timestamps: true, tableName: "users" })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  userName: string;

  @Column
  password: string;

  createdAt: Date;
  updatedAt: Date;
}
