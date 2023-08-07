import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class BasketAddInput {

  @Field(() => Int, { defaultValue: 1 }) // подбати про перевірку чи не менше 1
  quantity: number

  @Field(() => Int) //при видаленні акаунта корзина має видалятися
  accountId: number

  @Field(() => Int) //при додаванні не допускається null, проте якщо даний продукт видалиться то треба щоб був null (нє ну а шо)
  productId: number

  // @Field({ nullable: true })
  // orders: Order[]
}