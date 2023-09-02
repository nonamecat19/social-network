import { Field, InputType, Int } from '@nestjs/graphql'

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

  @Field(() => Int, { nullable: true })
  accountId: number

  // @Field(() => Int, { nullable: true })
  // orderId: number
}