import { Course } from 'src/entities/course.entity';
import { CourseController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
})
export class CourseModule {}
