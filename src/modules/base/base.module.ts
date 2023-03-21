import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo, User } from '../../entities';
import { AuthModule } from '../authentication/auth.module';
import { UserController } from './controllers';
import { TodoController } from './controllers/todo.controller';
import { TodoService, UserService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo]), AuthModule],
  controllers: [UserController, TodoController],
  providers: [UserService, TodoService],
})
export class BaseModule {}
