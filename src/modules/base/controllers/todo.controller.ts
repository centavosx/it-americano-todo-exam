import { Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { Parameter } from '../../../helpers';
import { Param, Patch } from '@nestjs/common/decorators';
import { TodoService } from '../services';
import { TodoDto } from '../dto';
import { Auth } from '../../../decorators';
import { Todo } from '../../../entities';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  public async getAllTodo(): Promise<Todo[]> {
    return await this.todoService.getAllTodos();
  }

  @Get(Parameter.id())
  public async getTodo(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.getTodo(id);
  }

  @Auth()
  @Post()
  public async createTodo(@Body() data: TodoDto): Promise<Todo> {
    return await this.todoService.createTodo(data);
  }

  @Auth()
  @Patch(Parameter.id())
  public async updateTodo(
    @Param('id') id: string,
    @Body() data: TodoDto,
  ): Promise<Todo> {
    return await this.todoService.updateTodo(id, data);
  }

  @Auth()
  @Delete(Parameter.id())
  public async deleteTodo(@Param('id') id: string): Promise<void> {
    return await this.todoService.deleteTodo(id);
  }
}
