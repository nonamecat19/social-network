import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service'


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' }) // по замовчуванню щукає юзера по імені та паролю
  }

  async validate(login: string, password: string): Promise<any> {
    const account = await this.authService.validateAccount(login, password);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}