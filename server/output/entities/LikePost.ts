import {
  Column, CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'
import { Account } from "./Account";
import { Post } from "./Post";

@Index("like_post_pkey", ["idLike"], { unique: true })
@Entity("like_post", { schema: "public" })
export class LikePost {
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


  @ManyToOne(() => Account, (account) => account.likePosts)
  @JoinColumn([{ name: "id_account", referencedColumnName: "idAccount" }])
  idAccount: Account;

  @ManyToOne(() => Post, (post) => post.likePosts)
  @JoinColumn([{ name: "id_post", referencedColumnName: "idPost" }])
  idPost: Post;
}
