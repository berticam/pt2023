import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DeleteResult, Repository } from "typeorm";
import { CreateUserDto } from "./Dto/Create-user.dto";
import { InternalProvidersStorage } from "@nestjs/core/injector/internal-providers-storage";
import { UpdateUserDto } from "./Dto/Update-user.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getALL(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(createUserDto.password, 10);
    const data = { ...createUserDto, password: hashed};
    console.log(data);
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async userUpdate(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.getById(id);

  }
}
