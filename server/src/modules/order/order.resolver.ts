import { InjectRepository } from '@nestjs/typeorm'
import { Order } from '../../../db/entities'
import { Repository } from 'typeorm'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OrderAddInput } from '../../graphql-input/order-add.input'
import { OrderEditInput } from '../../graphql-input/order-edit.input'
// import { EntityWithId } from '../../types/category.types'

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  @Query(() => [Order])
  public async orders(): Promise<Order[]> {
    return await this.orderRepository.find()
  }

  @Query(() => Order)
  public async order(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<Order> {
    return await this.orderRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  @Mutation(() => Order, { name: 'orderAdd' })
  public async add(
    @Args('input', { type: () => OrderAddInput })
      input: OrderAddInput,
  ): Promise<Order> {
    return await this.orderRepository.save(input)
  }


  @Mutation(() => Order, { name: 'orderEdit' })
  public async edit(
    @Args('id', { type: () => Int })
      id: number,
    @Args('input', { type: () => OrderEditInput })
      input: OrderEditInput,
  ): Promise<Order> {
    const order = await this.orderRepository.findOneOrFail({
      where: {
        id,
      },
    })
    return await this.orderRepository.save(
      new Order(Object.assign(order, input)),
    )
  }

  // @Mutation(() => EntityWithId, { name: 'orderDelete' })
  // public async delete(
  //   @Args('id', { type: () => Int })
  //     id: number,
  // ): Promise<EntityWithId> {
  //   const order = await this.orderRepository.findOneOrFail({
  //     where: {
  //       id,
  //     },
  //   })
  //   await this.orderRepository.remove(order)
  //
  //   return new EntityWithId(id)
  // }
}