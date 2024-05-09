import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';
import { Gender } from 'src/common/enum';

export class RegisterBodyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  date_of_birth: Date;
}

export class LoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  refresh_token: string;
}
