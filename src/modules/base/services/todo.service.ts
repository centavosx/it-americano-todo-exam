import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../../../entities';
import { Repository } from 'typeorm';
import { TodoDto } from '../dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  public async getTodo(id: string): Promise<Todo> {
    try {
      return await this.todoRepository.findOneOrFail({ where: { id } });
    } catch {
      throw new NotFoundException('Todo not found!');
    }
  }

  public async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  public async createTodo(data: TodoDto): Promise<Todo> {
    let newTodo = new Todo();
    newTodo = {
      ...newTodo,
      ...data,
    };
    return await this.todoRepository.save(newTodo);
  }

  public async deleteTodo(id: string): Promise<void> {
    await this.todoRepository.softDelete(id);
    return;
  }

  public async updateTodo(id: string, data: TodoDto): Promise<Todo> {
    let todoData = await this.todoRepository.findOne({ where: { id } });
    if (!todoData) throw new NotFoundException('Todo is not found');
    todoData = { ...todoData, ...data };
    return await this.todoRepository.save(todoData);
  }
}
