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

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  patronymic: string;

  @Column()
  login: string;

  @Column()
  contacts: string | null;

  @Column()
  address: string | null;

  @Column()
  password: string | null;

  @Column()
  photo_src: string | null;

  @Column("enum", {
    name: "group",
    enum: ["New buyer", "Rare buyer", "Frequent buyer", "VIP"],
    default: "New buyer"
  })
  group: "New buyer" | "Rare buyer" | "Frequent buyer" | "VIP" | null;

  @OneToMany(() => Basket, (basket) => basket.account, {onDelete: 'CASCADE'})
  baskets: Basket[]

  @OneToMany(() => Favorite, (favorite) => favorite.account, {onDelete: 'CASCADE'})
  favorites: Favorite[]

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateAt: Date;
}
