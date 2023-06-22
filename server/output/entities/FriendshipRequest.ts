import {
  Column, CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'
import { Account } from "./Account";

@Index("friendship_request_pkey", ["idFriendshipRequest"], { unique: true })
@Entity("friendship_request", { schema: "public" })
export class FriendshipRequest {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_friendship_request" })
  idFriendshipRequest: number;

  @Column("enum", {
    name: "status_request",
    nullable: true,
    enum: ["rejected", "accepted", "reviewed", "not reviewed"],
  })
  statusRequest: "rejected" | "accepted" | "reviewed" | "not reviewed" | null;

  // @Column("date", {
  //   name: "dateoffriendshiprequest",
  //   nullable: true,
  //   default: () => "CURRENT_DATE",
  // })
  // dateoffriendshiprequest: string | null;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;


  @ManyToOne(() => Account, (account) => account.friendshipRequests)
  @JoinColumn([{ name: "id_account1", referencedColumnName: "idAccount" }])
  idAccount: Account;

  @ManyToOne(() => Account, (account) => account.friendshipRequests2)
  @JoinColumn([{ name: "id_account2", referencedColumnName: "idAccount" }])
  idAccount2: Account;
}
