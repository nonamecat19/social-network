import { Field, InputType } from '@nestjs/graphql'
import { Basket } from '../../db/entities'

@InputType()
export class OrderAddInput {

  @Field()
  name: string

  @Field({ nullable: true })
  comment: string

  @Field()
  delivery_method: string

  @Field()
  payment_method: string

  // @Field()
  // status:

  @Field()
  baskets: Promise<Basket[]>

}