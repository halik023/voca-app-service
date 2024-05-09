import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { HttpMessage, HttpStatusCode } from 'src/common/enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException(
        {
          status: HttpStatusCode.UNAUTHORIZED,
          message: HttpMessage.UNAUTHORIZED,
        },
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
      });
      request['user_data'] = payload;
    } catch {
      throw new HttpException(
        {
          status: HttpStatusCode.INVALID_TOKEN,
          message: HttpMessage.INVALID_ACCESS_TOKEN,
        },
        HttpStatusCode.INVALID_TOKEN,
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization
      ? request.headers.authorization.split(' ')
      : [];

    return type === 'Bearer' ? token : undefined;
  }
}
