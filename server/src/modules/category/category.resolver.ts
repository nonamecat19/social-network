import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from '../../../db/entities'
import { Repository } from 'typeorm'
import { CategoryAddInput } from '../../graphql-input/category-add.input'
import { CategoryEditInput } from '../../graphql-input/category-edit.input'
import { EntityWithId } from '../../types/delete-id.types'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
  }

  @Query(() => [Category])
  public async categories(): Promise<Category[]> {
    return await this.categoryRepository.find()
  }

  @Query(() => Category)
  public async category(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<Category> {
    return await this.categoryRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  @Mutation(() => Category, { name: 'categoryAdd' })
  public async add(
    @Args('input', { type: () => CategoryAddInput })
      input: CategoryAddInput,
  ): Promise<Category> {
    return await this.categoryRepository.save(input) // (new Category(input))
  }


  @Mutation(() => Category, { name: 'categoryEdit' })
  public async edit(
    @Args('id', { type: () => Int })
      id: number,
    @Args('input', { type: () => CategoryEditInput })
      input: CategoryEditInput,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneOrFail({
      where: {
        id,
      },
    })
    return await this.categoryRepository.save(
      new Category(Object.assign(category, input)),
    )
  }

  @Mutation(() => EntityWithId, { name: 'categoryDelete' })
  public async delete(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<EntityWithId> {
    const category = await this.categoryRepository.findOneOrFail({
      where: {
        id,
      },
    })
    await this.categoryRepository.remove(category)

    return new EntityWithId(id)
  }
}











