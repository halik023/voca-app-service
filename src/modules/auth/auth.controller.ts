import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterBodyDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: RegisterBodyDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.register(body);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response): Promise<Response> {
    const token = await this.authService.login(body);
    return res.status(HttpStatus.OK).json(token);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: RefreshTokenDto,
    @Res() res: Response,
  ): Promise<Response> {
    const token = await this.authService.refreshToken(body);
    return res.status(HttpStatus.CREATED).json(token);
  }
}
