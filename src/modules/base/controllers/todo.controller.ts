import { Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { Parameter } from '../../../helpers';
import { Param, Patch } from '@nestjs/common/decorators';
import { UserService } from '../services';
import { CreateUserDto } from '../dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllTodo() {
    return await this.userService.getAllUser();
  }

  @Get(Parameter.id())
  public async getTodo(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Post()
  public async createTodo(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @Patch(Parameter.id())
  public async updateTodo(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @Delete(Parameter.id())
  public async deleteTodo(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
