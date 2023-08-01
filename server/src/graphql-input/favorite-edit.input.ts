import { InputType, PartialType } from '@nestjs/graphql'
import { FavoriteAddInput } from './favorite-add.input'

@InputType()
export class FavoriteEditInput extends PartialType(FavoriteAddInput) {
}