import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Product } from '../../../db/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductAddInput } from '../../graphql-input/product-add.input'
import { ProductEditInput } from '../../graphql-input/product-edit.input'
import { EntityWithId } from '../../types/delete-id.types'

@Resolver(() => Product)
export class ProductResolver{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
  }

  @Query(() => [Product])
  public async products(): Promise<Product[]> {
    return await this.productRepository.find()
  }

  @Query(() => Product)
  public async product(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<Product> {
    return await this.productRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  @Mutation(() => Product, { name: 'productAdd' })
  public async add(
    @Args('input', { type: () => ProductAddInput })
      input: ProductAddInput,
  ): Promise<Product> {
    return await this.productRepository.save(input) // (new Product(input))
  }


  @Mutation(() => Product, { name: 'productEdit' })
  public async edit(
    @Args('id', { type: () => Int })
      id: number,
    @Args('input', { type: () => ProductEditInput })
      input: ProductEditInput,
  ): Promise<Product> {
    const product = await this.productRepository.findOneOrFail({
      where: {
        id,
      },
    })
    return await this.productRepository.save(
      new Product(Object.assign(product, input)),
    )
  }

  @Mutation(() => EntityWithId, { name: 'productDelete' })
  public async delete(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<EntityWithId> {
    const product = await this.productRepository.findOneOrFail({
      where: {
        id,
      },
    })
    await this.productRepository.remove(product)

    return new EntityWithId(id)
  }
}