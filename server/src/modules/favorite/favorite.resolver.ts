import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Favorite } from '../../../db/entities'
import { FavoriteAddInput } from '../../graphql-input/favorite-add.input'
import { FavoriteEditInput } from '../../graphql-input/favorite-edit.input'
import { EntityWithId } from '../../types/category.types'

@Resolver(() => Favorite)
export class FavoriteResolver {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {
  }

  @Query(() => [Favorite])
  public async favorites(): Promise<Favorite[]> {
    return await this.favoriteRepository.find()
  }

  @Query(() => Favorite)
  public async favorite(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<Favorite> {
    return await this.favoriteRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  @Mutation(() => Favorite, { name: 'favoriteAdd' })
  public async add(
    @Args('input', { type: () => FavoriteAddInput })
      input: FavoriteAddInput,
  ): Promise<Favorite> {
    return await this.favoriteRepository.save(input)
  }

  @Mutation(() => Favorite, { name: 'favoriteEdit' })
  public async edit(
    @Args('id', { type: () => Int })
      id: number,
    @Args('input', { type: () => FavoriteEditInput })
      input: FavoriteEditInput,
  ): Promise<Favorite> {
    const favorite = await this.favoriteRepository.findOneOrFail({
      where: {
        id,
      },
    })
    return await this.favoriteRepository.save(
      new Favorite(Object.assign(favorite, input)),
    )
  }

  @Mutation(() => EntityWithId, { name: 'favoriteDelete' })
  public async delete(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<EntityWithId> {
    const favorite = await this.favoriteRepository.findOneOrFail({
      where: {
        id,
      },
    })
    await this.favoriteRepository.remove(favorite)

    return new EntityWithId(id)
  }
}
