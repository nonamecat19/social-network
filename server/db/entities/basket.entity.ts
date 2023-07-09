import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Account } from './account.entity'
import { Product } from './product.entity'
import { Order } from './order.entity'

@Entity()
export class Basket {
  @PrimaryGeneratedColumn({name: 'id_basket'})
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Account, (account) => account.baskets)
  @JoinColumn({name: 'id_account'})
  account: Account

  @ManyToOne(() => Product, (product) => product.baskets)
  @JoinColumn({name: 'id_product'})
  product: Product

  @ManyToMany(type => Order, order => order.baskets)
  orders: Order[];

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateAt: Date;
}
