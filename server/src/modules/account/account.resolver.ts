import { InjectRepository } from '@nestjs/typeorm'
import { Account } from '../../../db/entities'
import { Repository } from 'typeorm'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AccountAddInput } from '../../graphql-input/account-add.input'
import { AccountEditInput } from '../../graphql-input/account-edit.input'
import { EntityWithId } from '../../types/category.types'

@Resolver(() => Account)
export class AccountResolver {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
  }

  @Query(() => [Account])
  public async accounts(): Promise<Account[]> {
    return await this.accountRepository.find()
  }

  @Query(() => Account)
  public async account(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<Account> {
    return await this.accountRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  @Mutation(() => Account, { name: 'accountAdd' })
  public async add(
    @Args('input', { type: () => AccountAddInput })
      input: AccountAddInput,
  ): Promise<Account> {
    return await this.accountRepository.save(input)// (new Category(input))
  }


  @Mutation(() => Account, { name: 'accountEdit' })
  public async edit(
    @Args('id', { type: () => Int })
      id: number,
    @Args('input', { type: () => AccountEditInput })
      input: AccountEditInput,
  ): Promise<Account> {
    const account = await this.accountRepository.findOneOrFail({
      where: {
        id,
      },
    })
    return await this.accountRepository.save(
      new Account(Object.assign(account, input)),
    )
  }

  @Mutation(() => EntityWithId, { name: 'accountDelete' })
  public async delete(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<EntityWithId> {
    const account = await this.accountRepository.findOneOrFail({
      where: {
        id,
      },
    })
    await this.accountRepository.remove(account)

    return new EntityWithId(id)
  }

}