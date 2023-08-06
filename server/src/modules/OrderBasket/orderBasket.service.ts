import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ErrorsService } from '../../common/errors.service'
import { Order_baskets_basket } from '../../../db/entities'

@Injectable()
export class OrderBasketService {
  constructor(
    @InjectRepository(Order_baskets_basket)
    private readonly orderBasketRepository: Repository<Order_baskets_basket>,
    private readonly errorsService: ErrorsService,
  ) {
  }

  async findAll() {
    return await this.orderBasketRepository.find()
  }

  // async findOne(id: number) {
  //   let object = await this.orderBasketRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   })
  //   await this.errorsService.ErrorDataNotFound(object)
  //   return object
  // }


  async createOrderBasket(orderId: number, basketId: number) {
    // // const object = new Order(orderData)
    // const object = new OrderBasket();
    // await this.errorsService.ErrorIdNullError(orderId)
    // await this.errorsService.ErrorIdNullError(basketId)
    // object.order = Promise.resolve({ id: orderId } as Order)
    // object.basket = Promise.resolve({ id: basketId } as Basket)
    //
    // // object.baskets = this.getObjectById<Basket>(basketId)
    // try {
    //   await this.orderBasketRepository.save(object)
    //   return object
    // } catch (e) {
    //   await this.errorsService.ErrorRelationshipError()
    // }
  }

  async create(orderId: number, basketId: number): Promise<Order_baskets_basket> {
    const object = new Order_baskets_basket()
    await this.errorsService.ErrorIdNullError(orderId)
    await this.errorsService.ErrorIdNullError(basketId)
    object.orderIdOrder = orderId
    object.basketIdBasket = basketId

    // object.baskets = this.getObjectById<Basket>(basketId)
    try {
      await this.orderBasketRepository.save(object)
      return object
    } catch (e) {
      console.log(e)
      await this.errorsService.ErrorRelationshipError()
    }
  }

  // async update(id: number, input: OrderBasketEditInput) {
  //   const orderBasket = await this.findOne(id)
  //   return await this.orderBasketRepository.save(
  //     new OrderBasket(Object.assign(orderBasket, input)),
  //   )
  // }

  // async remove(id: number) {
  //   const orderBasket = await this.findOne(id)
  //   await this.orderBasketRepository.remove(orderBasket)
  //   return new EntityWithId(id)
  // }
}
