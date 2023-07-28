import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Favorite } from '../../../db/entities'
import { Repository } from 'typeorm'
import { EntityWithId } from '../../types/delete-id.types'
import { FavoriteAddInput } from '../../graphql-input/favorite-add.input'
import { FavoriteEditInput } from '../../graphql-input/favorite-edit.input'

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {
  }

  async findAll() {
    return await this.favoriteRepository.find()
  }

  async findOne(id: number) {
    return await this.favoriteRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  async create(input: FavoriteAddInput) {
    return await this.favoriteRepository.save(input)
  }

  async update(id: number, input: FavoriteEditInput) {
    const favorite = await this.findOne(id)
    return await this.favoriteRepository.save(
      new Favorite(Object.assign(favorite, input)),
    )
  }

  async remove(id: number) {
    const favorite = await this.findOne(id)
    await this.favoriteRepository.remove(favorite)
    return new EntityWithId(id)
  }
}
