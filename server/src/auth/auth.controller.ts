import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard) // щоб перед виконанням коду спрацювала перевірка написана в local.strategy.ts
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard) // не пустить в профіль без токена
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

}
