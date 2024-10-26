import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { hash } from "bcrypt";
import { IPagination } from "src/shared/common/pagination";
import { CreateUserDto } from "./dto/create-user.dto";
import { ListUsersDTO } from "./dto/list-user.dto";
import { UserDTO } from "./dto/user.dto";
import { UserRepository } from "./providers/users.reposirory";

@Injectable()
export class UsersService {
  constructor(@Inject(UserRepository) private readonly repository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDTO> {
    createUserDto.password = await hash(createUserDto.password, 10);
    return this.repository.create(createUserDto);
  }

  async findOneById(id: number): Promise<UserDTO> {
    const user = await this.repository.findById(id);

    if (!user) throw new NotFoundException("User is not found");

    return user;
  }

  async findAll(dto: ListUsersDTO): Promise<{ users: UserDTO[]; meta: IPagination }> {
    const users = await this.repository.findAll(dto);
    return users;
  }

  async findByUserName(username: string): Promise<UserDTO | null> {
    const user = await this.repository.findByUserName(username);
    return user;
  }
}
