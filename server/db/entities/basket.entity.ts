import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Account } from './account.entity'
import { Product } from './product.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@Entity()
@ObjectType()
export class Basket {
  constructor(partial?: Partial<Basket>) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn({ name: 'id_basket' })
  @Field(() => Int)
  id!: number

  @Column()
  @Field(() => Int, { defaultValue: 1 })
  quantity!: number


  @ManyToOne(() => Account, (account) => account.baskets)
  @JoinColumn({ name: 'id_account' })
  @Field(() => Account)
  account!: Promise<Account>

  @ManyToOne(() => Product, (product) => product.baskets)
  @JoinColumn({ name: 'id_product' })
  @Field(() => Product, { nullable: true })
  product: Promise<Product>

  // @ManyToMany(() => Order, (order) => order.baskets)
  // @Field(() => [Order], { nullable: true })
  // orders: Promise<Order[]>

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt!: Date
}
