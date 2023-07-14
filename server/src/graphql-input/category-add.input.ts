import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, MinLength } from 'class-validator'

@InputType()
export class CategoryAddInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  title: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  photo_src: string
}