import {
  Column, CreateDateColumn,
  Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'
import { Basket } from './basket.entity'
import { Favorite } from './favorite.entity'

@Entity()
export class Account {
  @PrimaryGeneratedColumn({name: 'id_account'})
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false })
  patronymic: string;

  @Column({ nullable: false, unique: true })
  login: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  contacts: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  photo_src: string;

  @Column("enum", {
    name: "group",
    enum: ["New buyer", "Rare buyer", "Frequent buyer", "VIP"],
    default: "New buyer",
    nullable: true
  })
  group: "New buyer" | "Rare buyer" | "Frequent buyer" | "VIP";

  @OneToMany(() => Basket, (basket) => basket.account, {onDelete: 'CASCADE'})
  baskets: Basket[]

  @OneToMany(() => Favorite, (favorite) => favorite.account, {onDelete: 'CASCADE'})
  favorites: Favorite[]

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateAt: Date;
}
