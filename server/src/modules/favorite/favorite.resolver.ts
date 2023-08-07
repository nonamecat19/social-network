import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Favorite } from '../../../db/entities'
import { FavoriteAddInput } from '../../graphql-input/favorite-add.input'
import { FavoriteEditInput } from '../../graphql-input/favorite-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { FavoriteService } from './favorite.service'

@Resolver(() => Favorite)
export class FavoriteResolver {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly favoriteService: FavoriteService,
  ) {
  }

  @Query(() => [Favorite])
  public async favorites(): Promise<Favorite[]> {
    return await this.favoriteService.findAll()
  }

  @Query(() => Favorite, { description: '---' })
  public async favorite(
    @Args('id', { type: () => Int }) id: number): Promise<Favorite> {
    return await this.favoriteService.findOne(id)
  }

  @Mutation(() => Favorite, { name: 'favoriteAdd' })
  public async add(
    @Args('input', { type: () => FavoriteAddInput }) input: FavoriteAddInput): Promise<Favorite> {
    return await this.favoriteService.create(input)
  }

  @Mutation(() => Favorite, { name: 'favoriteEdit' })
  public async edit(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => FavoriteEditInput }) input: FavoriteEditInput): Promise<Favorite> {
    return await this.favoriteService.update(id, input)
  }

  @Mutation(() => EntityWithId, { name: 'favoriteDelete', description: '---' })
  public async delete(
    @Args('id', { type: () => Int }) id: number): Promise<EntityWithId> {
    return await this.favoriteService.remove(id)
  }
}
