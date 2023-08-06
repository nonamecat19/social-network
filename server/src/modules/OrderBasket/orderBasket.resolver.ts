import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Order_baskets_basket } from '../../../db/entities'
import { OrderBasketService } from './orderBasket.service'

@Resolver(() => Order_baskets_basket)
export class OrderBasketResolver {
  constructor(
    @InjectRepository(Order_baskets_basket)
    private readonly orderBasketRepository: Repository<Order_baskets_basket>,
    private readonly orderBasketService: OrderBasketService,
  ) {
  }

  // @Query(() => [Order_baskets_basket])
  // public async orderBaskets(): Promise<Order_baskets_basket[]> {
  //   return await this.orderBasketService.findAll()
  // }

  // @Query(() => OrderBasket, { description: '---' })
  // public async order(
  //   @Args('id', { type: () => Int }) id: number): Promise<OrderBasket> {
  //   return await this.orderBasketService.findOne(id)
  // }

  // @Mutation(() => OrderBasket, { name: 'orderAdd' })
  // public async add(
  //   @Args('input', { type: () => OrderBasketAddInput }) input: OrderBasketAddInput): Promise<OrderBasket> {
  //   return await this.orderBasketService.create(input)
  // }
  //
  // @Mutation(() => OrderBasket, { name: 'orderEdit' })
  // public async edit(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Args('input', { type: () => OrderBasketEditInput }) input: OrderBasketEditInput): Promise<OrderBasket> {
  //   return await this.orderBasketService.update(id, input)
  // }

  // @Mutation(() => EntityWithId, { name: 'orderDelete', description: '---' })
  // public async delete(
  //   @Args('id', { type: () => Int }) id: number): Promise<EntityWithId> {
  //   return await this.orderBasketService.remove(id)
  // }
}