import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Account, Basket, Category, Producer, Product } from '../../../db/entities'
import { Repository } from 'typeorm'
import { BasketAddInput } from '../../graphql-input/basket-add.input'
import { BasketEditInput } from '../../graphql-input/basket-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { BasketService } from './basket.service'
import { BasketEntity } from '../../types/basket.types'

@Resolver(() => Basket)
export class BasketResolver {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    private readonly basketService: BasketService,
  ) {
  }

  @ResolveField(() => Account)
  async category(@Parent() basket: Basket): Promise<Account> {
    return await basket.account
  }

  @ResolveField(() => Product)
  async producer(@Parent() basket: Basket): Promise<Product> {
    return await basket.product
  }


  @Query(() => [Basket])
  public async baskets(): Promise<Basket[]> {
    return await this.basketService.findAll()
  }

  @Query(() => Basket, { description: '---' })
  public async basket(
    @Args('id', { type: () => Int }) id: number): Promise<Basket> {
    return await this.basketService.findOne(id)
  }

  @Mutation(() => Basket, { name: 'basketAdd' })
  public async add(
    @Args('input', { type: () => BasketAddInput }) input: BasketAddInput): Promise<Basket> {
    return await this.basketService.create(input)
  }

  @Mutation(() => Basket, { name: 'basketEdit' })
  public async edit(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => BasketEditInput }) input: BasketEditInput): Promise<Basket> {
    return await this.basketService.update(id, input)
  }

  @Mutation(() => BasketEntity, { name: 'basketDelete', description: '---' })
  public async delete(
    @Args('id', { type: () => Int }) id: number): Promise<BasketEntity> {
    return await this.basketService.remove(id)
  }
}