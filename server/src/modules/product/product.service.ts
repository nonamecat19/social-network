import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category, Producer, Product } from '../../../db/entities'
import { Repository } from 'typeorm'
import { EntityWithId } from '../../types/delete-id.types'
import { ProductEditInput } from '../../graphql-input/product-edit.input'
import { ProductAddInput } from '../../graphql-input/product-add.input'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
  }

  async findAll() {
    return await this.productRepository.find()
  }

  async findOne(id: number) {
    return await this.productRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  async create(input: ProductAddInput) {
    const { categoryId, producerId, ...productData } = input
    const product = new Product(productData)
    if (categoryId) {
      product.category = Promise.resolve({ id: categoryId } as Category)
    }
    if (producerId) {
      product.producer = Promise.resolve({ id: producerId } as Producer)
    }

    //console.log(product)
    return await this.productRepository.save(product)
  }

  async update(id: number, input: ProductEditInput) {
    const product = await this.findOne(id)
    return await this.productRepository.save(
      new Product(Object.assign(product, input)),
    )
  }

  async remove(id: number) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)
    return new EntityWithId(id)
  }
}
