import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Basket } from './basket.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Status } from '../../src/types/order.types'
import { Account } from './account.entity'
import { Product } from './product.entity'
import { Order } from './order.entity'

@Entity()
@ObjectType()
export class OrderRecord {
  constructor(
    partial?: Partial<OrderRecord>,
  ) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn({ name: 'id_orderRecord' })
  @Field(() => Int)
  id: number

  @Column({ nullable: true })
  @Field(() => Int, { defaultValue: 1, nullable: true })
  quantity: number

  @ManyToOne(() => Product, (product) => product.order_records, { nullable: true })
  @JoinColumn({ name: 'id_product' })
  @Field(() => Product, { nullable: true })
  product: Promise<Product>

  @ManyToOne(() => Order, (order) => order.order_records, { nullable: true })
  @JoinColumn({ name: 'id_order' })
  @Field(() => Order, { nullable: true })
  order: Promise<Order>

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date
}
