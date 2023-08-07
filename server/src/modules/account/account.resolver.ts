import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Account } from '../../../db/entities'
import { Repository } from 'typeorm'
import { AccountAddInput } from '../../graphql-input/account-add.input'
import { AccountEditInput } from '../../graphql-input/account-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { AccountService } from './account.service'

@Resolver(() => Account)
export class AccountResolver {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly accountService: AccountService,
  ) {
  }

  @Query(() => [Account])
  public async accounts(): Promise<Account[]> {
    return await this.accountService.findAll()
  }

  @Query(() => Account, { description: '---' })
  public async account(
    @Args('id', { type: () => Int }) id: number): Promise<Account> {
    return await this.accountService.findOne(id)
  }

  @Mutation(() => Account, { name: 'accountAdd' })
  public async add(
    @Args('input', { type: () => AccountAddInput }) input: AccountAddInput): Promise<Account> {
    return await this.accountService.create(input)
  }

  @Mutation(() => Account, { name: 'accountEdit' })
  public async edit(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => AccountEditInput }) input: AccountEditInput): Promise<Account> {
    return await this.accountService.update(id, input)
  }

  @Mutation(() => EntityWithId, { name: 'accountDelete', description: '---' })
  public async delete(
    @Args('id', { type: () => Int }) id: number): Promise<EntityWithId> {
    return await this.accountService.remove(id)
  }

}