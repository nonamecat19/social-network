import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account, Basket, Product } from '../../../db/entities'
import { Repository } from 'typeorm'
import { BasketEditInput } from '../../graphql-input/basket-edit.input'
import { BasketAddInput } from '../../graphql-input/basket-add.input'
import { BasketEntity } from '../../types/basket.types'
import { ErrorCodes, ErrorDescriptionsArray } from '../../common/statusCodes'
import { ProductService } from '../product/product.service'
import { AccountService } from '../account/account.service'

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    // private readonly productService: ProductService,
    // private readonly accountService: AccountService,
  ) {
  }

  async findAll() {
    return await this.basketRepository.find()
  }

  async findOne(id: number) {
    let basket = await this.basketRepository.findOne({
      where: {
        id,
      },
    })
    if (!basket) {
      console.log(ErrorDescriptionsArray[ErrorCodes.DataNotFound])
      throw new BadRequestException(ErrorCodes.DataNotFound)//запис не знайдено//Запис з вказаним id (' + { id } + ') не знайдено.
    }
    return basket
  }

  // async checkAccountExists(accountId: number): Promise<boolean> {
  //   const account = await this.accountService.findOne(accountId)
  //   return !!account // Повертає true, якщо запис знайдено, або false, якщо запис не знайдено
  // }
  //
  // async checkProductExists(productId: number): Promise<boolean> {
  //   const product = await this.productService.findOne(productId)
  //   return !!product
  // }

  async create(input: BasketAddInput) {
    const { accountId, productId, ...basketData } = input

    if (!accountId || !productId) { //хоча в цьому методі перевірки не потрібні, бо сюди має 100% приходити числа, проте це чомусь не так
      console.log(ErrorDescriptionsArray[ErrorCodes.IdNullError])
      throw new BadRequestException(ErrorCodes.IdNullError) //id були null
    }
    // if (!(await this.checkAccountExists(accountId)) || !(await this.checkProductExists(productId))) {
    //   console.log(ErrorDescriptionsArray[ErrorCodes.RelationshipError])
    //   throw new BadRequestException(ErrorCodes.RelationshipError) //id були null
    // }
    await this.IsProductInBasket(accountId, productId)

    const basket = new Basket(basketData)
    basket.account = Promise.resolve({ id: accountId } as Account)
    basket.product = Promise.resolve({ id: productId } as Product)
    return await this.basketRepository.save(basket)
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
    return new BasketEntity(id)
  }


  async IsProductInBasket(accountId: number, productId: number) {
    const basket = await this.basketRepository.findOne({
      where: {
        account: { id: accountId },
        product: { id: productId },
      },
    })
    if (basket) {
      console.log(ErrorDescriptionsArray[ErrorCodes.DataAlreadyExists])
      throw new BadRequestException(ErrorCodes.DataAlreadyExists)//запис вже існує
    }
  }

}
