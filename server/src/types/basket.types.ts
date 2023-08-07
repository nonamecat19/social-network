import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Basket, Product } from '../../db/entities'

@ObjectType()
export class BasketEntity {
  constructor(id: number,
              //message: string,
              //basket: Basket
  ) {
    this.id = id
    // this.message = message
    //this.basket = basket
  }

  @Field(() => Int, { nullable: true })
  id: number

  // @Field()
  // message: string

  // @Field(() => Basket, { nullable: true })
  // basket: Basket
}