import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Product } from './product.entity'

@Entity()
export class Producer {
  @PrimaryGeneratedColumn({ name: 'id_producer' })
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  photo_src: string

  @OneToMany(() => Product, (product) => product.producer, {onDelete: 'SET NULL'})
  products: Product[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date
}
