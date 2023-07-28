import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Basket } from '../../../db/entities'
import { Repository } from 'typeorm'
import { BasketAddInput } from '../../graphql-input/basket-add.input'
import { BasketEditInput } from '../../graphql-input/basket-edit.input'
import { EntityWithId } from '../../types/basket.types'
import { BasketService } from './basket.service'

@Resolver(() => Basket)
export class BasketResolver {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    private readonly basketService: BasketService,
  ) {
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

  @Mutation(() => EntityWithId, { name: 'basketDelete', description: '---' })
  public async delete(
    @Args('id', { type: () => Int }) id: number): Promise<EntityWithId> {
    return await this.basketService.remove(id)
  }
}