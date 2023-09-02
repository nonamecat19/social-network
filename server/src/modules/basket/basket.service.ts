import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account, Basket, Product } from '../../../db/entities'
import { Repository } from 'typeorm'
import { BasketEditInput } from '../../graphql-input/basket-edit.input'
import { BasketAddInput } from '../../graphql-input/basket-add.input'
import { BasketEntity } from '../../types/basket.types'
import { ErrorsService } from '../../common/errors.service'

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    private readonly errorsService: ErrorsService,
  ) {
  }

  async findAll() {
    return await this.basketRepository.find()
  }

  async findAllBaskets(accountId: number) {
    let object = await this.basketRepository.find({
      where: {
        account: { id: accountId }
      },
    })
    await this.errorsService.ErrorDataNotFound(object)
    return object
  }

  async findOne(id: number) {
    let object = await this.basketRepository.findOne({
      where: {
        id,
      },
    })
    await this.errorsService.ErrorDataNotFound(object)
    return object
  }

  async create(input: BasketAddInput) {
    const { accountId, productId, ...basketData } = input
    await this.errorsService.ErrorIdNullError(accountId)
    await this.errorsService.ErrorIdNullError(productId)
    await this.IsProductInBasket(accountId, productId)
    const object = new Basket(basketData)
    object.account = Promise.resolve({ id: accountId } as Account)
    object.product = Promise.resolve({ id: productId } as Product)

    try {
      return await this.basketRepository.save(object)
    } catch (e) {
      await this.errorsService.ErrorRelationshipError()
    }
  }

  async update(id: number, input: BasketEditInput) {
    const object = await this.findOne(id)
    return await this.basketRepository.save(
      new Basket(Object.assign(object, input)),
    )
  }

  async remove(id: number) {
    const object = await this.findOne(id)
    await this.basketRepository.remove(object)
    return new BasketEntity(id)
  }

  async clearBasket(accountId: number) {
    const object = await this.basketRepository.find({
      where: {
        account: { id: accountId }
      },
    })
    await this.basketRepository.remove(object)
      //return object
  }

  async IsProductInBasket(accountId: number, productId: number) {
    const object = await this.basketRepository.findOne({
      where: {
        account: { id: accountId },
        product: { id: productId },
      },
    })
    await this.errorsService.ErrorDataAlreadyExists(object)
  }
}
