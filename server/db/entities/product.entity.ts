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

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ name: 'id_product' })
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string
  //
  // @Column()
  // photo_src: string | null

  @Column()
  price: number

  @Column()
  count: number



  // @Column()
  // SEO_atributs: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({name: 'id_category'})
  category: Category | null

  @ManyToOne(() => Producer, (producer) => producer.products)
  @JoinColumn({name: 'id_producer'})
  producer: Producer | null

  @OneToMany(() => Basket, (basket) => basket.product, {onDelete: 'CASCADE'})
  baskets: Basket[]

  @OneToMany(() => Favorite, (favorite) => favorite.product, {onDelete: 'CASCADE'})
  favorites: Favorite[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date
}
