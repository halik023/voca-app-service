import { Response } from 'express';
import { HttpStatusCode } from 'src/common/enum';

export class ActionResult<D> {
  status: HttpStatusCode;
  message: string | string[];
  data?: D | D[];

  constructor(status: HttpStatusCode, message: string, data?: D | D[]) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export type AsyncResponseData<D> = Promise<Response<ActionResult<D>>>;
export type ResponseData<D> = Response<ActionResult<D>>;
