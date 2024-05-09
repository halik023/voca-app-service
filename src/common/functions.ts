import { HttpException } from '@nestjs/common';
import { HttpMessage, HttpStatusCode } from './enum';

export const exceptionFactory = (errors) => {
  const result = errors.map((error) => ({
    property: error.property,
    message: Object.values(error.constraints),
  }));

  return new HttpException(
    {
      status: HttpStatusCode.BAD_REQUEST,
      message: HttpMessage.BAD_REQUEST,
      errors: result,
    },
    HttpStatusCode.BAD_REQUEST,
  );
};
