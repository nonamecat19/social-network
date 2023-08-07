import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProducerAddInput {

  @Field()
  name: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  photo_src: string

}