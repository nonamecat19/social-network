import {
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Product } from './product.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@Entity()
@ObjectType()
export class Producer {

  constructor(partial?: Partial<Producer>) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn({ name: 'id_producer' })
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  photo_src: string


  @OneToMany(() => Product, (product) => product.producer, { onDelete: 'SET NULL' })
  @Field(() => [Product], { nullable: true })
  products: Promise<Product[]>


  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date
}
