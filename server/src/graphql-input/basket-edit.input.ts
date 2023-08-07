import { InputType, PartialType } from '@nestjs/graphql'
import { BasketAddInput } from './basket-add.input'

@InputType()
export class BasketEditInput extends PartialType(BasketAddInput) {
}