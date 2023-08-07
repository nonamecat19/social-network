import { Field, InputType } from '@nestjs/graphql'
import { Group } from '../types/account.types'

@InputType()
export class AccountAddInput {

  @Field()
  name: string

  @Field()
  surname: string

  @Field()
  patronymic: string

  @Field()
  login: string

  @Field({ nullable: true })
  password: string

  @Field({ nullable: true })
  contacts: string

  @Field({ nullable: true })
  address: string

  @Field({ nullable: true })
  photo_src: string

  // @Field({ nullable: true })
  // group: Group

}