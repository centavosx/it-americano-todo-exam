import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, BaseModule } from './modules';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './config';
import {
  AuthMiddleware,
  RefreshMiddleware,
} from './modules/authentication/middleware';
import { User } from './entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User]),
    BaseModule,
    AuthModule,
  ],
  providers: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/refresh', method: RequestMethod.GET })
      .forRoutes('*');
    consumer
      .apply(RefreshMiddleware)
      .forRoutes({ path: '/refresh', method: RequestMethod.GET });
  }
}
