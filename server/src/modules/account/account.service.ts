import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Account } from '../../../db/entities'
import { Repository } from 'typeorm'

//import  argon2  from 'argon2'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
  ) {
  }

  async create(createAccountDto: CreateAccountDto) {
    const existAccount = await this.accountRepository.findOne({
      where: {
        login: createAccountDto.login,
      },
    })

    if (existAccount) throw new BadRequestException('This login (email) already exist!')

    const account = await this.accountRepository.save({
      name: createAccountDto.name,
      surname: createAccountDto.surname,
      patronymic: createAccountDto.patronymic,
      login: createAccountDto.login,
      password: createAccountDto.password,
      contacts: createAccountDto.contacts,
      address: createAccountDto.address,
      photo_src: createAccountDto.photo_src,
      group: createAccountDto.group,
    })

    return { account }
  }

  // findAll() {
  //   return `This action returns all account`
  // }

  async findOne(login: string) {
    return await this.accountRepository.findOne({
      where: {
        login: login,
      },
    })
  }

  //тимчасова штука для реєстрації
  async findOneByPass(login: string, password: string) {
    return await this.accountRepository.findOne({
      where: {
        login: login,
        password: password,
      },
    })
  }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} account`
  // }
}
