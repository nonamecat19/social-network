import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class BasketAddInput {

  @Field() //мінімум 1
  quantity: number

  @Field(() => Int, { nullable: true })
  accountId: number

  @Field(() => Int, { nullable: true })
  productId: number

  // @Field({ nullable: true })
  // orders: Order[]
}