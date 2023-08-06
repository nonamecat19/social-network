import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Basket } from './basket.entity'
import { Order } from './order.entity'
import { Field, Int } from '@nestjs/graphql'

@Entity()
export class Order_baskets_basket {
  // @PrimaryGeneratedColumn()
  // @Field(() => Int)
  // id: number

  // @JoinTable()
  // @Field(() => Order, { nullable: true })
  // @ManyToOne(() => Order, (order) => order.baskets)
  // // order: Order
  // order: Promise<Order>
  //
  // @JoinTable()
  // @Field(() => Basket, { nullable: true })
  // @ManyToOne(() => Basket, (basket) => basket.orders)
  // // basket: Basket
  // basket: Promise<Basket>

  @PrimaryColumn()
  @Field(() => Int)
  orderIdOrder: number

  @PrimaryColumn()
  @Column()
  @Field(() => Int)
  basketIdBasket: number
}
