import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Category } from '../../../db/entities'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryAddInput } from '../../graphql-input/category-add.input'

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

  @Mutation(() => Category, { name: 'categoryAdd' }) // якщо не задати тут ім'я, то братиметься по заамовчуванню назва методу (add в даному випадку)
  public async add(
    @Args('input', { type: () => CategoryAddInput })
      input: CategoryAddInput,
  ): Promise<Category> {
    return await this.categoryRepository.save(input)
  }

}