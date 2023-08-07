import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category, Producer, Product } from '../../../db/entities'
import { Repository } from 'typeorm'
import { EntityWithId } from '../../types/delete-id.types'
import { ProductEditInput } from '../../graphql-input/product-edit.input'
import { ProductAddInput } from '../../graphql-input/product-add.input'
import { ErrorsService } from '../../common/errors.service'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly errorsService: ErrorsService,
  ) {
  }

  async findAll() {
    return await this.productRepository.find()
  }

  async findOne(id: number) {
    let object = await this.productRepository.findOne({
      where: {
        id,
      },
    })
    await this.errorsService.ErrorDataNotFound(object)
    return object
  }

  async create(input: ProductAddInput) {
    const { categoryId, producerId, ...productData } = input
    const object = new Product(productData)
    await this.errorsService.ErrorIdNullError(categoryId)
    await this.errorsService.ErrorIdNullError(producerId)
    object.category = Promise.resolve({ id: categoryId } as Category)
    object.producer = Promise.resolve({ id: producerId } as Producer)

    try {
      return await this.productRepository.save(object)
    } catch (e) {
      await this.errorsService.ErrorRelationshipError()
    }
  }

  async update(id: number, input: ProductEditInput) {
    const object = await this.findOne(id)
    return await this.productRepository.save(
      new Product(Object.assign(object, input)),
    )
  }

  async remove(id: number) {
    const object = await this.findOne(id)
    await this.productRepository.remove(object)
    return new EntityWithId(id)
  }
}
