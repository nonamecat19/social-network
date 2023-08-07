import { Module } from '@nestjs/common'
import { FavoriteService } from './favorite.service'
import { FavoriteResolver } from './favorite.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Favorite } from '../../../db/entities'
import { ErrorsService } from '../../common/errors.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
  ],
  providers: [
    FavoriteService,
    FavoriteResolver,
    ErrorsService,
  ],
})

export class FavoriteModule {
}
