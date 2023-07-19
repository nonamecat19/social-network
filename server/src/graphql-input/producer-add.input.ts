import { Field } from '@nestjs/graphql'

export class ProducerAddInput{

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  photo_src: string

}