import { Args, Int, Mutation, Parent, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Basket, Order } from '../../../db/entities'
import { Repository } from 'typeorm'
import { OrderAddInput } from '../../graphql-input/order-add.input'
import { OrderEditInput } from '../../graphql-input/order-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { OrderService } from './order.service'

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderService: OrderService,
  ) {
  }

  @Query(() => [Order])
  public async orders(
  ): Promise<Order[]> {
    return await this.orderService.findAll()
  }

  @Query(() => Order, { description: '---' })
  public async order(
    @Args('id', { type: () => Int }) id: number): Promise<Order> {
    return await this.orderService.findOne(id)
  }

  @Mutation(() => Order, { name: 'orderAdd' })
  public async add(
    @Args('input', { type: () => OrderAddInput })
      input: OrderAddInput): Promise<Order> {
    return await this.orderService.create(input)
  }

  @Mutation(() => Order, { name: 'orderEdit' })
  public async edit(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => OrderEditInput })
      input: OrderEditInput): Promise<Order> {
    return await this.orderService.update(id, input)
  }

  @Mutation(() => EntityWithId, { name: 'orderDelete', description: '---' })
  public async delete(
    @Args('id', { type: () => Int }) id: number): Promise<EntityWithId> {
    return await this.orderService.remove(id)
  }
}