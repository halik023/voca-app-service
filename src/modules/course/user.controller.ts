import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { HttpMessage, HttpStatusCode } from 'src/common/enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { ActionResult } from 'src/interfaces/common.interface';

@Controller('courses')
export class CourseController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get()
  getAllCourses(@Res() res: Response): Response<ActionResult<string>> {
    try {
      const token = 'Get course';
      const data = new ActionResult<string>(
        HttpStatusCode.OK,
        HttpMessage.OK,
        token,
      );

      return res.status(data.status).json(data);
    } catch (error) {
      const data = new ActionResult<string>(
        error.status || HttpStatusCode.INTERNAL_SERVER_ERROR,
        error.message || HttpMessage.INTERNAL_SERVER_ERROR,
      );

      return res.status(data.status).json(data);
    }
  }
}
