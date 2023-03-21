import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, BaseModule } from './modules';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './config';
import {
  AuthMiddleware,
  RefreshMiddleware,
} from './modules/authentication/middleware';
import { User } from './entities';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User]),
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 3,
    }),
    BaseModule,
    AuthModule,
  ],
  providers: [ConfigService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
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
