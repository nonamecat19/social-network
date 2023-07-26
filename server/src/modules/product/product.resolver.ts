import { Args, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Category, Producer, Product } from '../../../db/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductAddInput } from '../../graphql-input/product-add.input'
import { ProductEditInput } from '../../graphql-input/product-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
//import { Injectable } from '@nestjs/common'

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    // @InjectRepository(Category)
    // private readonly categoryRepository: Repository<Category>,
    // @InjectRepository(Producer)
    // private readonly producerRepository: Repository<Producer>,
  ) {
  }

  @ResolveField(() => Category)
  async category(@Parent() product: Product): Promise<Category> {
    return await product.category
  }

  @ResolveField(() => Producer)
  async producer(@Parent() product: Product): Promise<Producer> {
    return await product.producer
  }


  @Query(() => [Product])
  public async products(): Promise<Product[]> {
    return await this.productRepository.find()
  }

  @Query(() => Product, { description: '---' })
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
  public async add(@Args('input', { type: () => ProductAddInput }) input: ProductAddInput): Promise<Product> {
    const {  categoryId, producerId, ...productData } = input;
    const product = new Product(productData);
    if (categoryId) {
      product.category = Promise.resolve({ id: categoryId } as Category);
    }
    if (producerId) {
      product.producer = Promise.resolve({ id: producerId } as Producer);
    }

    //console.log(product)
    return await this.productRepository.save(product)
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

  @Mutation(() => EntityWithId, { name: 'productDelete', description: '---' })
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