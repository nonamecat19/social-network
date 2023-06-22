import {
  Column, CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'
import { Account } from "./Account";
import { PostComment } from "./PostComment";

@Index("like_comment_pkey", ["idLike"], { unique: true })
@Entity("like_comment", { schema: "public" })
export class LikeComment {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_like" })
  idLike: number;

  @Column("enum", {
    name: "assessment",
    nullable: true,
    enum: ["like", "dislike"],
  })
  assessment: "like" | "dislike" | null;

  // @Column("timestamp without time zone", {
  //   name: "dateoflike",
  //   nullable: true,
  //   default: () => "CURRENT_TIMESTAMP",
  // })
  // dateoflike: Date | null;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;


  @ManyToOne(() => Account, (account) => account.likeComments)
  @JoinColumn([{ name: "id_account", referencedColumnName: "idAccount" }])
  idAccount: Account;

  @ManyToOne(() => PostComment, (postComment) => postComment.likeComments)
  @JoinColumn([{ name: "id_comment", referencedColumnName: "idComment" }])
  idComment: PostComment;
}
