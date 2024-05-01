import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('courses')
export class CourseController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get()
  getAllCourses(): string {
    return 'Get course';
  }
}
