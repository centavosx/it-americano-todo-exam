import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import { hashPassword } from 'src/helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async getUser(id: string) {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch {
      throw new NotFoundException('User not found!');
    }
  }

  public async getAllUser() {
    return await this.userRepository.find();
  }

  public async createUser({ password, email, ...rest }: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    if (!!user) throw new ConflictException('Email existed!');

    let newUser = new User();
    newUser = {
      ...user,
      ...rest,
      email,
      password: await hashPassword(password),
    };
    return await this.userRepository.save(newUser);
  }

  public async deleteUser(id: string) {
    await this.userRepository.softDelete(id);
    return;
  }
}
