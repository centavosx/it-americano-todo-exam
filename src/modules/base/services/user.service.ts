import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from '../dto';
import { hashPassword, ifMatched } from 'src/helpers';
import { TokenService } from 'src/modules/authentication/services';
import { LoginResponseDto } from '../dto/login-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
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

  public async loginUser({
    email,
    password,
  }: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    if (!(await ifMatched(user.password, password)))
      throw new BadRequestException('Wrong password');

    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.whitelistToken(tokens.refreshToken, user.id);
    return tokens;
  }
}
