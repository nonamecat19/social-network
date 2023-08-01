import { InputType, PartialType } from '@nestjs/graphql'
import { OrderAddInput } from './order-add.input'

@InputType()
export class OrderEditInput extends PartialType(OrderAddInput) {
}