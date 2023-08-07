import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class FavoriteAddInput {
  @Field(() => Int, { nullable: true })
  accountId: number

  @Field(() => Int, { nullable: true })
  productId: number
}