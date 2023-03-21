import * as jwt from 'jsonwebtoken';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token, User } from '../../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  public async createAccessToken(data: User): Promise<string> {
    return jwt.sign({ ...data }, process.env.ACCESS_KEY as string, {
      expiresIn: '15m',
    });
  }

  public async createRefreshToken(data: User): Promise<string> {
    return jwt.sign({ ...data }, process.env.REFRESH_KEY as string, {
      expiresIn: '168h',
    });
  }

  public async verifyToken(
    token: string,
    isRefresh: boolean,
    dontThrowError?: boolean,
  ): Promise<User | null> {
    try {
      const decoded = jwt.verify(
        token,
        (isRefresh
          ? process.env.REFRESH_KEY
          : process.env.ACCESS_KEY) as string,
      );
      return decoded as User;
    } catch {
      if (dontThrowError) return null;
      throw new UnauthorizedException('Unauthorized');
    }
  }

  public async whitelistToken(token: string, id: string): Promise<Token> {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const newToken = new Token();
    newToken.tokenId = token;
    newToken.exp = date;
    newToken.userId = id;
    return await this.tokenRepository.save(newToken);
  }

  public async unlistToken(token: string, userId: string): Promise<void> {
    await this.tokenRepository.delete({
      tokenId: token,
      userId: userId,
    });
    return;
  }

  public async unlistUserIds(ids: string[]): Promise<void> {
    await this.tokenRepository
      .createQueryBuilder('token')
      .leftJoin('token.user', 'user')
      .where(`user.id IN (:...ids)`, { ids })
      .delete()
      .execute();
    return;
  }

  public async ifWhiteListed(token: string, userId: string): Promise<boolean> {
    try {
      const verify = await this.tokenRepository.findOneOrFail({
        where: {
          userId,
          tokenId: token,
        },
      });

      const date = new Date();
      if (verify.exp > date) return true;
      await this.unlistToken(token, userId);
      return false;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  public async generateTokens(data: User) {
    delete data.password;
    return {
      accessToken: await this.createAccessToken(data),
      refreshToken: await this.createRefreshToken(data),
    };
  }
}
