import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Account } from './account.entity'
import { Product } from './product.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@Entity()
@ObjectType()
export class Favorite {
  constructor(partial?: Partial<Favorite>) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn({ name: 'id_favorite' })
  @Field(() => Int)
  id: number


  @ManyToOne(() => Account, (account) => account.favorites)
  @JoinColumn({ name: 'id_account' })
  @Field(() => Account, { nullable: true })
  account: Promise<Account>

  @ManyToOne(() => Product, (product) => product.favorites)
  @JoinColumn({ name: 'id_product' })
  @Field(() => Product, { nullable: true })
  product: Promise<Product>


  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date
}
