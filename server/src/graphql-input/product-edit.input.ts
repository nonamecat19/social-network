import { InputType, PartialType } from '@nestjs/graphql'
import { ProductAddInput } from './product-add.input'

@InputType()
export class ProductEditInput extends PartialType(ProductAddInput) {
}