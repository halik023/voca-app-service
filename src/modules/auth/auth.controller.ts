import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterBodyDto } from 'src/dtos/auth.dto';
import { ActionResult } from 'src/interfaces/common.interface';
import { User } from 'src/entities/user.entity';
import { HttpMessage, HttpStatusCode } from 'src/common/enum';
import { ITokenRes } from 'src/interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: RegisterBodyDto,
    @Res() res: Response,
  ): Promise<Response<ActionResult<User>>> {
    try {
      const user = await this.authService.register(body);
      const data = new ActionResult<User>(
        HttpStatusCode.CREATED,
        HttpMessage.CREATED,
        user,
      );

      return res.status(data.status).json(data);
    } catch (error) {
      const data = new ActionResult<User>(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error.message || HttpMessage.INTERNAL_SERVER_ERROR,
      );

      return res.status(data.status).json(data);
    }
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res() res: Response,
  ): Promise<Response<ActionResult<ITokenRes>>> {
    try {
      const token = await this.authService.login(body);
      const data = new ActionResult<ITokenRes>(
        HttpStatusCode.OK,
        HttpMessage.OK,
        token,
      );

      return res.status(data.status).json(data);
    } catch (error) {
      const data = new ActionResult<ITokenRes>(
        error.status || HttpStatusCode.INTERNAL_SERVER_ERROR,
        error.message || HttpMessage.INTERNAL_SERVER_ERROR,
      );

      return res.status(data.status).json(data);
    }
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: RefreshTokenDto,
    @Res() res: Response,
  ): Promise<Response<ActionResult<ITokenRes>>> {
    try {
      const token = await this.authService.refreshToken(body);
      const data = new ActionResult<ITokenRes>(
        HttpStatusCode.OK,
        HttpMessage.OK,
        token,
      );

      return res.status(data.status).json(data);
    } catch (error) {
      const data = new ActionResult<ITokenRes>(
        error.status || HttpStatusCode.INTERNAL_SERVER_ERROR,
        error.message || HttpMessage.INTERNAL_SERVER_ERROR,
      );

      return res.status(data.status).json(data);
    }
  }
}
