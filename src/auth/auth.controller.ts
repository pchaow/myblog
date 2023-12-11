import { Body, Controller, Post, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    Logger.log(signInDto.username)
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
