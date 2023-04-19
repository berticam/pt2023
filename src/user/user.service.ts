import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DeleteResult, Repository } from "typeorm";
import { CreateUserDto } from "./Dto/Create-user.dto";
import { InternalProvidersStorage } from "@nestjs/core/injector/internal-providers-storage";
import { UpdateUserDto } from "./Dto/Update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getALL(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async userUpdate(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.getById(id);

  }
}
