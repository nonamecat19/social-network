import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from '../../../db/entities'
import { Repository } from 'typeorm'
import { EntityWithId } from '../../types/delete-id.types'
import { OrderAddInput } from '../../graphql-input/order-add.input'
import { OrderEditInput } from '../../graphql-input/order-edit.input'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  async findAll() {
    return await this.orderRepository.find()
  }

  async findOne(id: number) {
    return await this.orderRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  async create(input: OrderAddInput) {
    return await this.orderRepository.save(input)
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
