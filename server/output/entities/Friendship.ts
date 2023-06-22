import {
  Column, CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'
import { Account } from "./Account";

@Index("friendship_pkey", ["idFriendship"], { unique: true })
@Entity("friendship", { schema: "public" })
export class Friendship {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_friendship" })
  idFriendship: number;

  @Column("timestamp without time zone", {
    name: "dateOfFriendship",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateOfFriendship: Date | null;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;



  @ManyToOne(() => Account, (account) => account.friendships)
  @JoinColumn([{ name: "id_account1", referencedColumnName: "idAccount" }])
  idAccount: Account;

  @ManyToOne(() => Account, (account) => account.friendships2)
  @JoinColumn([{ name: "id_account2", referencedColumnName: "idAccount" }])
  idAccount2: Account;
}
