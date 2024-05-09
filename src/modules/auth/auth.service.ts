import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AccountType, HttpMessage, HttpStatusCode } from 'src/common/enum';
import { LoginDto, RefreshTokenDto, RegisterBodyDto } from 'src/dtos/auth.dto';
import { ITokenRes } from 'src/interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(params: RegisterBodyDto): Promise<User> {
    const userExisted = await this.userRepository.count({
      where: {
        email: params.email,
      },
    });

    if (userExisted) {
      throw new HttpException(
        {
          status: HttpStatusCode.BAD_REQUEST,
          message: 'Email is existed',
        },
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const user = this.userRepository.create({
      ...params,
      type: AccountType.NORMAL,
    });

    await this.userRepository.save(user);

    delete user.password;
    delete user.type;

    return user;
  }

  async login(loginDto: LoginDto): Promise<ITokenRes> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });

    const isCorrectPass = user?.isValidPassword(loginDto.password);

    if (!(user && isCorrectPass)) {
      throw new HttpException(
        {
          status: HttpStatusCode.BAD_REQUEST,
          message: HttpMessage.LOGIN_ERROR,
        },
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const payload = { id: user.id, email: user.email };
    const tokens = await this.generateToken(payload);

    this.userRepository.save(user);

    return tokens;
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(
        refreshTokenDto.refresh_token,
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
        },
      );
      const user = await this.userRepository.findOneBy({
        email: verify.email,
      });

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatusCode.INVALID_TOKEN,
            message: HttpMessage.INVALID_ACCESS_TOKEN,
          },
          HttpStatusCode.INVALID_TOKEN,
        );
      }

      const payload = { id: user.id, email: user.email };
      const tokens = await this.generateToken(payload);

      this.userRepository.save(user);

      return tokens;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatusCode.INVALID_TOKEN,
          message: HttpMessage.INVALID_ACCESS_TOKEN,
        },
        HttpStatusCode.INVALID_TOKEN,
      );
    }
  }

  async generateToken(payload: {
    id: string;
    email: string;
  }): Promise<ITokenRes> {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
