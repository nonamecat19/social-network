import { Args, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Category, Producer, Product } from '../../../db/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductAddInput } from '../../graphql-input/product-add.input'
import { ProductEditInput } from '../../graphql-input/product-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { ProductService } from './product.service'

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productService: ProductService,
  ) {
  }

  @ResolveField(() => Category)
  async category(@Parent() product: Product): Promise<Category> {
    //const { id } = product;
    //return this.categoryService.findAll({ productId: id });
    return await product.category
  }

  @ResolveField(() => Producer)
  async producer(@Parent() product: Product): Promise<Producer> {
    return await product.producer
  }


  @Query(() => [Product])
  public async products(): Promise<Product[]> {
    return await this.productService.findAll()
  }

  @Query(() => Product, { description: '---' })
  public async product(
    @Args('id', { type: () => Int }) id: number): Promise<Product> {
    return await this.productService.findOne(id)
  }

  @Mutation(() => Product, { name: 'productAdd' })
  public async add(
    @Args('input', { type: () => ProductAddInput }) input: ProductAddInput): Promise<Product> {
    return await this.productService.create(input)
  }

  @Mutation(() => Product, { name: 'productEdit' })
  public async edit(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => ProductEditInput }) input: ProductEditInput): Promise<Product> {
    return await this.productService.update(id, input)
  }

  @Mutation(() => EntityWithId, { name: 'productDelete', description: '---' })
  public async delete(
    @Args('id', { type: () => Int }) id: number): Promise<EntityWithId> {
    return await this.productService.remove(id)
  }
}