import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Basket } from './basket.entity'
import { Favorite } from './favorite.entity'
import { Group } from '../../src/types/account.types'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@Entity()
@ObjectType()
export class Account {
  constructor(
    partial?: Partial<Account>,
  ) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn({ name: 'id_account' })
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  surname: string

  @Column()
  @Field()
  patronymic: string

  @Column({ unique: true })
  @Field()
  login: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  password: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  contacts: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  address: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  photo_src: string

  @Column('enum', {
    //name: 'group',
    enum: Group,
    default: Group.newBuyer,
    nullable: true,
  })
  @Field(() => Group)
  group: Group


  @OneToMany(() => Basket, (basket) => basket.account, { onDelete: 'CASCADE' })
  @Field(() => [Basket], { nullable: true })
  baskets: Promise<Basket[]>

  @OneToMany(() => Favorite, (favorite) => favorite.account, { onDelete: 'CASCADE' })
  @Field(() => [Favorite], { nullable: true })
  favorites: Promise<Favorite[]>


  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updateAt: Date
}
