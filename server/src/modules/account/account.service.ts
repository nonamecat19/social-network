import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Account } from '../../../db/entities'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { AccountAddInput } from '../../graphql-input/account-add.input'
import { AccountEditInput } from '../../graphql-input/account-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { ErrorsService } from '../../common/errors.service'

//import  argon2  from 'argon2'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwrService: JwtService,
    private readonly errorsService: ErrorsService,
  ) {
  }

  async findAll(): Promise<Account[]> {
    return await this.accountRepository.find()
  }

  async findOne(id: number): Promise<Account> {
    let object = await this.accountRepository.findOne({
      where: {
        id,
      },
    })
    await this.errorsService.ErrorDataNotFound(object)
    return object
  }

  async findAccount(login: string) {
    return await this.accountRepository.findOne({
      where: {
        login: login,
      },
    })
  }

  //тимчасова функція для реєстрації
  async findOneByPass(login: string, password: string) {
    return await this.accountRepository.findOne({
      where: {
        login: login,
        password: password,
      },
    })
  }

  async update(id: number, input: AccountEditInput) {
    const object = await this.findOne(id)
    return await this.accountRepository.save(
      new Account(Object.assign(object, input)),
    )
  }

  async remove(id: number) {
    const object = await this.findOne(id)
    await this.accountRepository.remove(object)
    return new EntityWithId(id)
  }

  async create(//createAccountDto: CreateAccountDto,
    input: AccountAddInput): Promise<Account> {
    await this.IsAccountExist(input)

    //const account: Account = await this.accountRepository.save(input)
    const token = this.jwrService.sign({ login: input.login })
    //return { account, token }
    return await this.accountRepository.save(input)
  }

  async IsAccountExist(input) {
    const existAccount = await this.findAccount(input.login)
    if (existAccount) {
      throw new BadRequestException('This login (email) already exist!')
    }
  }

}
