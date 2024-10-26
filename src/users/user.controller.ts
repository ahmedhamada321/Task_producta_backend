import { Body, Controller, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { IPagination } from "src/shared/common/pagination";
import { CreateUserDto } from "./dto/create-user.dto";
import { ListUsersDTO } from "./dto/list-user.dto";
import { UserDTO } from "./dto/user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDTO> {
    return this.usersService.create(createUserDto);
  }

  @Get(":id")
  async findOneById(@Param("id") id: number): Promise<UserDTO> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Get()
  async findAll(@Query() listUsersDto: ListUsersDTO): Promise<{ users: UserDTO[]; meta: IPagination }> {
    return this.usersService.findAll(listUsersDto);
  }
}
