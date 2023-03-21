import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../../entities';
import { RefreshController } from './controller';
import { TokenService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [RefreshController],
  providers: [TokenService],
  exports: [TokenService],
})
export class AuthModule {}
