import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo, User } from '../../entities';
import { UserController } from './controllers';
import { TodoController } from './controllers/todo.controller';
import { TodoService, UserService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  controllers: [UserController, TodoController],
  providers: [UserService, TodoService],
})
export class BaseModule {}
