import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { buildDataSourceOptions } from './database/datasource';
import { GlobalJwtModule } from './common/globalJwt.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/user.module';

@Module({
  imports: [
    GlobalJwtModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: buildDataSourceOptions,
    }),
    AuthModule,
    CourseModule,
  ],
})
export class AppModule {}
