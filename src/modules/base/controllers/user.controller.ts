import { Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { Parameter } from '../../../helpers';
import { Param } from '@nestjs/common/decorators';
import { UserService } from '../services';
import { CreateUserDto, LoginDto } from '../dto';
import { Auth, User } from '../../../decorators';
import { User as UserT } from '../../../entities';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Get(Parameter.id())
  public async getUser(@Param('id') id: string, @User() user: UserT) {
    const userId = id === 'me' ? user.id : id;
    return await this.userService.getUser(userId);
  }

  @Auth()
  @Post()
  public async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @Auth()
  @Delete(Parameter.id())
  public async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Post('/login')
  public async loginUser(@Body() data: LoginDto) {
    return await this.userService.loginUser(data);
  }
}
