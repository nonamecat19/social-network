import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Product } from './product.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ name: 'id_category' })
  id: number

  @Column({ nullable: false })
  title: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  photo_src: string

  // @Column()
  // SEO_atributs: string;

  @OneToMany(() => Product, (product) => product.category, {onDelete: 'SET NULL'})
  products: Product[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date
}
