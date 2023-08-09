import { Args, Int, Mutation, Parent, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Basket, Order, OrderRecord } from '../../../db/entities'
import { Repository } from 'typeorm'
import { OrderAddInput } from '../../graphql-input/order-add.input'
import { OrderEditInput } from '../../graphql-input/order-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { OrderRecordService } from './orderRecord.service'

@Resolver(() => OrderRecord)
export class  OrderRecordResolver {
  constructor(
    @InjectRepository(OrderRecord)
    private readonly orderRepository: Repository<OrderRecord>,
    private readonly orderService: OrderRecordService,
  ) {
  }

  @Query(() => [OrderRecord])
  public async orderRecords(
  ): Promise<OrderRecord[]> {
    return await this.orderService.findAll()
  }

  @Query(() => OrderRecord, { description: '---' })
  public async orderRecord(
    @Args('id', { type: () => Int }) id: number): Promise<OrderRecord> {
    return await this.orderService.findOne(id)
  }

  // @Mutation(() => [OrderRecord], { name: 'orderRecordAdd' })
  // public async add(
  //   @Args('input', { type: () => OrderAddInput })
  //     input: OrderAddInput): Promise<OrdeRecord[]> {
  //   return await this.orderService.create(input)
  // }

  @Mutation(() => OrderRecord, { name: 'orderRecordEdit' })
  public async edit(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => OrderEditInput })
      input: OrderEditInput): Promise<OrderRecord> {
    return await this.orderService.update(id, input)
  }

  @Mutation(() => EntityWithId, { name: 'orderRecordDelete', description: '---' })
  public async delete(
    @Args('id', { type: () => Int }) id: number): Promise<EntityWithId> {
    return await this.orderService.remove(id)
  }
}