import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from '../../../db/entities'
import { Repository } from 'typeorm'
import { EntityWithId } from '../../types/delete-id.types'
import { OrderAddInput } from '../../graphql-input/order-add.input'
import { OrderEditInput } from '../../graphql-input/order-edit.input'
import { ErrorsService } from '../../common/errors.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
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
    try {
      return await this.orderRepository.save(input)
    } catch (e) {
      await this.errorsService.ErrorRelationshipError()
    }
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
