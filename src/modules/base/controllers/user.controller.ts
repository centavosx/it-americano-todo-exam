import { Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { Parameter } from '../../../helpers';
import { Param } from '@nestjs/common/decorators';
import { UserService } from '../services';
import { CreateUserDto, LoginDto } from '../dto';
import { Auth, User } from '../../../decorators';
import { User as UserEntity } from '../../../entities';
import { LoginResponseDto } from '../dto/login-response.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUser(): Promise<UserEntity[]> {
    return await this.userService.getAllUser();
  }

  @Get(Parameter.id())
  public async getUser(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<UserEntity> {
    const userId = id === 'me' ? user.id : id;
    return await this.userService.getUser(userId);
  }

  @Post()
  public async createUser(@Body() data: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(data);
  }

  @Auth()
  @Delete(Parameter.id())
  public async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }

  @Post('/login')
  public async loginUser(@Body() data: LoginDto): Promise<LoginResponseDto> {
    return await this.userService.loginUser(data);
  }
}
