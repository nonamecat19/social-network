import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from './category.entity'
import { Producer } from './producer.entity'
import { Basket } from './basket.entity'
import { Favorite } from './favorite.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@Entity()
@ObjectType()
export class Product {
  constructor(
    partial?: Partial<Product>,
  ) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn({ name: 'id_product' })
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

  @Column()
  @Field()
  price: number

  @Column()
  @Field()
  count: number

  // @Column()
  // SEO_atributs: string;


  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({name: 'id_category'})
  @Field(() => [Category], { nullable: true })
  category: Promise<Category[]> | null

  @ManyToOne(() => Producer, (producer) => producer.products)
  @JoinColumn({name: 'id_producer'})
  @Field(() => [Producer], { nullable: true })
  producer: Promise<Producer[]> | null

  @OneToMany(() => Basket, (basket) => basket.product, {onDelete: 'CASCADE'})
  baskets: Basket[]

  @OneToMany(() => Favorite, (favorite) => favorite.product, {onDelete: 'CASCADE'})
  favorites: Favorite[]


  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date
}
