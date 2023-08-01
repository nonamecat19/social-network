import { InputType, Field } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, MinLength } from 'class-validator'

// import { Group } from '../types/account.types'

@InputType()
export class CategoryAddInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  title: string

  @Field({ nullable: true })
    //@IsNotEmpty()
  description: string

  @Field({ nullable: true })
  photo_src: string

  // @Field(() => Group)
  // @IsNotEmpty()
  // @IsEnum(Group)
  // group: Group
}