import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Basket } from './basket.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Status } from '../../src/types/order.types'
import { Account } from './account.entity'
import { Product } from './product.entity'
import { OrderRecord } from './order-record.entity'

@Entity()
@ObjectType()
export class Order {
  constructor(
    partial?: Partial<Order>,
  ) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn({ name: 'id_order' })
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  comment: string

  @Column()
  @Field()
  delivery_method: string

  @Column()
  @Field()
  payment_method: string

  @Column('enum', {
    //name: 'status',
    enum: Status,
    default: Status.notReviewed,
    nullable: true,
  })
  @Field(() => Status, { nullable: true })
  status: Status

  @Column({ nullable: true })
  @Field({ nullable: true })
  total_prise: number

  @ManyToOne(() => Account, (account) => account.order, { nullable: true })
  @JoinColumn({ name: 'id_account' })
  @Field(() => Account, { nullable: true })
  account: Promise<Account>

  @OneToMany(() => OrderRecord, (orderRecord) => orderRecord.order, { onDelete: 'SET NULL' })
  @Field(() => [OrderRecord], { nullable: true })
  order_records: Promise<OrderRecord[]>

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date
}
