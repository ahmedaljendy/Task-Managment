import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/dtos/dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport handles the redirect
  }

  // Google redirects back here
  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    console.log(req.user);

    return this.authService.validateOrCreateUser(req.user);
  }
}
