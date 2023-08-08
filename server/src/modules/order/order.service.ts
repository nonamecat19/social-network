import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account, Basket, Order } from '../../../db/entities'
import { Repository } from 'typeorm'
import { EntityWithId } from '../../types/delete-id.types'
import { OrderAddInput } from '../../graphql-input/order-add.input'
import { OrderEditInput } from '../../graphql-input/order-edit.input'
import { ErrorsService } from '../../common/errors.service'
import { OrderBasketService } from '../OrderBasket/orderBasket.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly errorsService: ErrorsService,
    private readonly orderBasketService: OrderBasketService,
    // private readonly basketRepository: Repository<Basket>,
  ) {
  }

  async findAll(basket: Basket) {
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

  // async getObjectById<T>(id: number) {
  //   return { id } as T
  // }

  // async createOrderBasket(orderId: number, basketId: number) {
  //   // const object = new Order(orderData)
  //   const object = new OrderBasket();
  //   await this.errorsService.ErrorIdNullError(orderId)
  //   await this.errorsService.ErrorIdNullError(basketId)
  //   object.order = Promise.resolve({ id: orderId } as Order)
  //   object.basket = Promise.resolve({ id: basketId } as Basket)
  //
  //   // object.baskets = this.getObjectById<Basket>(basketId)
  //   try {
  //     await this.orderBasketRepository.save(object)
  //     return object
  //   } catch (e) {
  //     await this.errorsService.ErrorRelationshipError()
  //   }
  // }

  async create(basket: Basket ,input: OrderAddInput): Promise<Order> {
    const { basketId, ...orderData } = input
    // const order = new Order();
    // const savedOrder = await this.orderRepository.save(order);
    //
    // // Create and save the OrderBasket entity with the many-to-many relationship
    // const orderBasket = new OrderBasket();
    // orderBasket.order = Promise.resolve(savedOrder);
    // orderBasket.basket = Promise.resolve({ id: basketId } as Basket);
    //
    // try {
    //   await this.orderBasketRepository.save(orderBasket);
    // } catch (e) {
    //   await this.errorsService.ErrorRelationshipError();
    // }
    //
    // return savedOrder;

    // let obj1 = new Basket()
    // let obj1 = await this.orderRepository.findOne({
    //   where: {
    //     id,
    //   },
    // })

    let obj = new Order()
    try {
      obj = await this.orderRepository.save(input)
    } catch (e) {
      await this.errorsService.ErrorRelationshipError()
    }

    console.log(obj.id)
    //замовлення одне й те саме, а потрібно передати id_account
    // і додавати в замовлення всі товари які на даний момент в користувача в корзині
    ////await this.orderBasketService.create(obj.id, basketId)

    // const object = new Order();
    // object.baskets = Promise.resolve({ id: obj.id } as Order)

    return (obj)
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
