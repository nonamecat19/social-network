import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Product } from './product.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn({ name: 'id_category' })
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  title: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string

  @Column({ nullable: true })
  @Field({ nullable: true, description: 'Link to photo category' })
  photo_src: string


  @OneToMany(() => Product, (product) => product.category, { onDelete: 'SET NULL' })
    // @Field(() => [Product], { nullable: true })
  products: Product[]

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updateAt: Date
}

// @Column()
// SEO_atributs: string;