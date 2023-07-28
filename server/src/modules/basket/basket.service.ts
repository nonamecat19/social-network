import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Basket } from '../../../db/entities'
import { Repository } from 'typeorm'
import { BasketEditInput } from '../../graphql-input/basket-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { BasketAddInput } from '../../graphql-input/basket-add.input'

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
  ) {
  }

  async findAll() {
    return await this.basketRepository.find()
  }

  async findOne(id: number) {
    return await this.basketRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  async create(input: BasketAddInput) {
    return await this.basketRepository.save(input)
  }

  async update(id: number, input: BasketEditInput) {
    const basket = await this.findOne(id)
    return await this.basketRepository.save(
      new Basket(Object.assign(basket, input)),
    )
  }

  async remove(id: number) {
    const basket = await this.findOne(id)
    await this.basketRepository.remove(basket)
    return new EntityWithId(id)
  }

}
