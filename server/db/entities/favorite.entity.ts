import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Account } from './account.entity'
import { Product } from './product.entity'

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn({name: 'id_favorite'})
  id: number;

  @ManyToOne(() => Account, (account) => account.favorites)
  @JoinColumn({name: 'id_account'})
  account: Account

  @ManyToOne(() => Product, (product) => product.favorites)
  @JoinColumn({name: 'id_product'})
  product: Product

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateAt: Date;
}
