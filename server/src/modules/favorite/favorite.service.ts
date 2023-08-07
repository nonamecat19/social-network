import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account, Favorite, Product } from '../../../db/entities'
import { Repository } from 'typeorm'
import { EntityWithId } from '../../types/delete-id.types'
import { FavoriteAddInput } from '../../graphql-input/favorite-add.input'
import { FavoriteEditInput } from '../../graphql-input/favorite-edit.input'
import { ErrorsService } from '../../common/errors.service'

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly errorsService: ErrorsService,
  ) {
  }

  async findAll() {
    return await this.favoriteRepository.find()
  }

  async findOne(id: number) {
    let object = await this.favoriteRepository.findOne({
      where: {
        id,
      },
    })
    await this.errorsService.ErrorDataNotFound(object)
    return object
  }

  async create(input: FavoriteAddInput) {
    const { accountId, productId, ...favoriteData } = input
    await this.errorsService.ErrorIdNullError(accountId)
    await this.errorsService.ErrorIdNullError(productId)
    await this.IsProductInFavorite(accountId, productId)
    const object = new Favorite(favoriteData)
    object.account = Promise.resolve({ id: accountId } as Account)
    object.product = Promise.resolve({ id: productId } as Product)

    try {
      return await this.favoriteRepository.save(object)
    } catch (e) {
      await this.errorsService.ErrorRelationshipError()
    }
  }

  async update(id: number, input: FavoriteEditInput) {
    const object = await this.findOne(id)
    return await this.favoriteRepository.save(
      new Favorite(Object.assign(object, input)),
    )
  }

  async remove(id: number) {
    const object = await this.findOne(id)
    await this.favoriteRepository.remove(object)
    return new EntityWithId(id)
  }

  async IsProductInFavorite(accountId: number, productId: number) {
    const object = await this.favoriteRepository.findOne({
      where: {
        account: { id: accountId },
        product: { id: productId },
      },
    })
    await this.errorsService.ErrorDataAlreadyExists(object)
  }

}
