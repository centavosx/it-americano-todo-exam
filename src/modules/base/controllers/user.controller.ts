import { Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { Parameter } from '../../../helpers';
import { Param } from '@nestjs/common/decorators';
import { UserService } from '../services';
import { CreateUserDto } from '../dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Get(Parameter.id())
  public async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Post()
  public async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @Delete(Parameter.id())
  public async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
