import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account, Basket, Order, Product } from '../../../db/entities'
import { Repository } from 'typeorm'
import { EntityWithId } from '../../types/delete-id.types'
import { OrderAddInput } from '../../graphql-input/order-add.input'
import { OrderEditInput } from '../../graphql-input/order-edit.input'
import { ErrorsService } from '../../common/errors.service'
import { BasketService } from '../basket/basket.service'
import { OrderRecordService } from '../orderRecord/orderRecord.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly basketService: BasketService,
    private readonly orderRecordService: OrderRecordService,
    private readonly errorsService: ErrorsService,
  ) {
  }

  async findAll() {
    return await this.orderRepository.find()
  }

  async findOne(id: number) {
    let object = await this.orderRepository.findOne({
      where: {
        id,
      },
    })
    await this.errorsService.ErrorDataNotFound(object)
    return object
  }

  async create(input: OrderAddInput) {
    const { accountId, ...orderData } = input

    const order = new Order({
      ...orderData,
      account: Promise.resolve({ id: accountId } as Account),
      total_prise: await this.orderRecordService.totalPriceCounter(accountId),
    })

    let savedOrder
    try {
      savedOrder = await this.orderRepository.save(order)
      console.log(savedOrder.id) //
    } catch (e) {
      await this.errorsService.ErrorRelationshipError()
    }

    await this.orderRecordService.create(savedOrder.id, accountId)

    return (order)
  }

  async update(id: number, input: OrderEditInput) {
    const order = await this.findOne(id)
    return await this.orderRepository.save(
      new Order(Object.assign(order, input)),
    )
  }

  async remove(id: number) {
    const order = await this.findOne(id)
    await this.orderRepository.remove(order)
    return new EntityWithId(id)
  }
}
