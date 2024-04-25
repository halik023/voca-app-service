import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { buildDataSourceOptions } from './database/datasource';
import { GlobalJwtModule } from './common/globalJwt.module';

@Module({
  imports: [
    GlobalJwtModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: buildDataSourceOptions,
    }),
  ],
})
export class AppModule {}
