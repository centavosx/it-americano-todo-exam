import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BaseModule } from './modules';
import { dataSourceOptions } from './config';
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), BaseModule],
})
export class AppModule {}
