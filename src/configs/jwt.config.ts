import { ConfigService } from '@nestjs/config';

export const jwtConfigFactory = (configService: ConfigService) => {
  return {
    global: true,
    secret: configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
    },
  };
};
