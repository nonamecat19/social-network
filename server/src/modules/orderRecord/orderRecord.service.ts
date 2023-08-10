import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account, Basket, Order, OrderRecord, Product } from '../../../db/entities'
import { Repository } from 'typeorm'
import { EntityWithId } from '../../types/delete-id.types'
import { OrderAddInput } from '../../graphql-input/order-add.input'
import { OrderEditInput } from '../../graphql-input/order-edit.input'
import { ErrorsService } from '../../common/errors.service'
import { BasketService } from '../basket/basket.service'

@Injectable()
export class OrderRecordService {
  constructor(
    @InjectRepository(OrderRecord)
    private readonly orderRepository: Repository<OrderRecord>,
    private readonly basketService: BasketService,
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

  async totalPriceCounter(accountId: number) {
    const baskets = await this.basketService.findAllBaskets(accountId)
    let sum = 0
    for (const basket of baskets) {
      sum += basket.product ? (await basket.product).price : null
    }
    return sum
  }

  async create(orderId: number, accountId: number) {
    const baskets = await this.basketService.findAllBaskets(accountId)
    for (const basket of baskets) {
      const productId = basket.product ? (await basket.product).id : null
      const orderRecord = new OrderRecord({
        quantity: basket.quantity,
        product: Promise.resolve({ id: productId } as Product),
        order: Promise.resolve({ id: orderId } as Order),
      })
      try {
        const savedOrderRecord = await this.orderRepository.save(orderRecord)
        console.log(savedOrderRecord.id) //
      } catch (e) {
        await this.errorsService.ErrorRelationshipError()
      }
    }
    //await this.basketService.clearBasket(accountId)
    return
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
