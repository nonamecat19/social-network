import {
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Basket } from './basket.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn({name: 'id_order'})
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  comment: string;

  @Column()
  delivery_method: string;

  @Column()
  payment_method: string;

  @Column("enum", {
    name: "status",
    enum: ["rejected", "accepted", "reviewed", "not reviewed"],
    default: "not reviewed",
    nullable: true
  })
  status: "rejected" | "accepted" | "reviewed" | "not reviewed";

  @ManyToMany(type => Basket)
  @JoinTable()
  baskets: Basket[];

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateAt: Date;
}
