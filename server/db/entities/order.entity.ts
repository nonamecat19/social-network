import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Basket } from './basket.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Status } from '../../src/types/order.types'

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


  @ManyToMany(() => Basket)
  @JoinTable()
  @Field(() => [Basket], { nullable: true })
  baskets: Promise<Basket[]>


  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date
}
