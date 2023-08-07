import { InputType, PartialType } from '@nestjs/graphql'
import { ProducerAddInput } from './producer-add.input'

@InputType()
export class ProducerEditInput extends PartialType(ProducerAddInput) {
}