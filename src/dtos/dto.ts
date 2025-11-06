import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isEmail,
  IsNotEmpty,
  MinLength,
  minLength,
} from 'class-validator';

export class AuthBaseDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ nullable: true })
  provider: string;

  @ApiProperty({ nullable: true })
  providerId: string;
}
export class SignUpDto extends AuthBaseDto {}
export class SignInDto extends OmitType(AuthBaseDto, ['name']) {}
