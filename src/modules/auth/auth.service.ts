import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { LoginDto, RefreshTokenDto, RegisterBodyDto } from './auth.dto';
import { ITokenRes } from './auth.interface';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ACCOUNT_TYPES } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(params: RegisterBodyDto): Promise<User> {
    const user = this.userRepository.create({
      ...params,
      type: ACCOUNT_TYPES.NORMAL,
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
        'Email or password is incorrect',
        HttpStatus.UNAUTHORIZED,
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
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = { id: user.id, email: user.email };
      const tokens = await this.generateToken(payload);

      this.userRepository.save(user);

      return tokens;
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
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
