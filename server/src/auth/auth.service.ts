import { Injectable, UnauthorizedException } from '@nestjs/common'

import { AccountService } from '../modules/account/account.service'
import { JwtService } from '@nestjs/jwt'
import { IAccount } from '../types/types'

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateAccount(login: string, password: string) {
    const account = await this.accountService.findAccount(login)

    //const passwordIsMatch = await (порівняти переданий пароль з захешованим в бд)
    const passwordIsMatch = await this.accountService.findOneByPass(login, password)

    if (account && passwordIsMatch) {
      return account
    }
    throw new UnauthorizedException('Something went wrong during authorization')
  }

  async login(account: IAccount) {
    const { id, login } = account
    return {
      id,
      login,
      token: this.jwtService.sign({ id: account.id, login: account.login }),
    }
  }
}