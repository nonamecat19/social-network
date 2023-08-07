import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ProductAddInput {

  @Field()
  name: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  photo_src: string

  @Field()
  price: number

  @Field()
  count: number


  @Field(() => Int, { nullable: true })
  categoryId: number

  @Field(() => Int, { nullable: true })
  producerId: number

}