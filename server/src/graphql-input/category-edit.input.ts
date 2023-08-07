import { InputType, PartialType } from '@nestjs/graphql'
import { CategoryAddInput } from './category-add.input'

@InputType()
export class CategoryEditInput extends PartialType(CategoryAddInput) {
}