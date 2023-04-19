import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDto } from './Dto/Create-user.dto';
import { DeleteResult } from 'typeorm';
import { UpdateUserDto } from './Dto/Update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getALL(): Promise<User[]> {
    return this.userService.getALL();
  }

  @Get(':id')
  getById(@Param(':id') id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.addUser(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.userUpdate(id, updateUserDto);
  }
}
