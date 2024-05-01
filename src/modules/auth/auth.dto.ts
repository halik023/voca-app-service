import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { GENDERS } from 'src/common/constants';

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
  gender: GENDERS;

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
