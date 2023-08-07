import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from '../../../db/entities'
import { Repository } from 'typeorm'
import { CategoryAddInput } from '../../graphql-input/category-add.input'
import { CategoryEditInput } from '../../graphql-input/category-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { CategoryService } from './category.service'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly categoryService: CategoryService,
  ) {
  }

  @Query(() => [Category])
  public async categories(): Promise<Category[]> {
    return await this.categoryService.findAll()
  }

  @Query(() => Category, { description: '---' })
  public async category(
    @Args('id', { type: () => Int }) id: number): Promise<Category> {
    return await this.categoryService.findOne(id)
  }

  @Mutation(() => Category, { name: 'categoryAdd' })
  public async add(
    @Args('input', { type: () => CategoryAddInput }) input: CategoryAddInput): Promise<Category> {
    return await this.categoryService.create(input)
  }

  @Mutation(() => Category, { name: 'categoryEdit' })
  public async edit(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => CategoryEditInput }) input: CategoryEditInput): Promise<Category> {
    return await this.categoryService.update(id, input)
  }

  @Mutation(() => EntityWithId, { name: 'categoryDelete', description: '---' })
  public async delete(
    @Args('id', { type: () => Int }) id: number): Promise<EntityWithId> {
    return await this.categoryService.remove(id)
  }


}











