import { Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { Parameter } from '../../../helpers';
import { Param, Patch } from '@nestjs/common/decorators';
import { TodoService } from '../services';
import { TodoDto } from '../dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  public async getAllTodo() {
    return await this.todoService.getAllTodos();
  }

  @Get(Parameter.id())
  public async getTodo(@Param('id') id: string) {
    return await this.todoService.getTodo(id);
  }

  @Post()
  public async createTodo(@Body() data: TodoDto) {
    return await this.todoService.createTodo(data);
  }

  @Patch(Parameter.id())
  public async updateTodo(@Param('id') id, @Body() data: TodoDto) {
    return await this.todoService.updateTodo(id, data);
  }

  @Delete(Parameter.id())
  public async deleteTodo(@Param('id') id: string) {
    return await this.todoService.deleteTodo(id);
  }
}
