import { ListUsersDTO } from "./../dto/list-user.dto";
import { IPagination } from "src/shared/common/pagination";
import { Pagination } from "src/shared/common/pagination";
import { Inject, Injectable } from "@nestjs/common";
import { UserDTO } from "../dto/user.dto";
import { User } from "../entities/users.entity";

@Injectable()
export class UserRepository {
  constructor(@Inject("USER_MODEL") private model: typeof User) {}

  async create(createUserDTO: Partial<User>): Promise<UserDTO> {
    return (await this.model.create(createUserDTO)).toJSON();
  }

  async findById(id: number): Promise<UserDTO | null> {
    return (await this.model.findByPk(id))?.toJSON() || null;
  }

  async findByUserName(userName: string): Promise<UserDTO | null> {
    return (
      (
        await this.model.findOne({
          where: { userName },
        })
      )?.toJSON() || null
    );
  }

  async findAll({ page, limit }: ListUsersDTO): Promise<{ users: UserDTO[]; meta: IPagination }> {
    const paginate = new Pagination(page, limit);

    const { rows: users, count } = await this.model.findAndCountAll({
      offset: paginate.getOffset(),
      limit: paginate.getLimit(),
    });
    return { users: users, meta: paginate.getMetaData(count) };
  }
}
