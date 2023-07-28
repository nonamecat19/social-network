import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteResolver } from './favorite.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Favorite } from '../../../db/entities'
@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite])
  ] ,
  providers: [
    FavoriteService,
    // FavoriteResolver
  ],
})
export class FavoriteModule {}
