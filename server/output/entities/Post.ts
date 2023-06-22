import {
  Column, CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'
import { LikePost } from "./LikePost";
import { Account } from "./Account";
import { PostComment } from "./PostComment";

@Index("post_pkey", ["idPost"], { unique: true })
@Entity("post", { schema: "public" })
export class Post {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_post" })
  idPost: number;

  @Column("character varying", { name: "photo_src", nullable: true })
  photoSrc: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  // @Column("timestamp without time zone", {
  //   name: "dateofpost",
  //   nullable: true,
  //   default: () => "CURRENT_TIMESTAMP",
  // })
  // dateofpost: Date | null;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;


  @Column("integer", {
    name: "numberOfLikes",
    nullable: true,
    default: () => "0",
  })
  numberOfLikes: number | null;

  @Column("integer", {
    name: "numberOfDislikes",
    nullable: true,
    default: () => "0",
  })
  numberOfDislikes: number | null;

  @OneToMany(() => LikePost, (likePost) => likePost.idPost, { onDelete: 'CASCADE'})
  likePosts: LikePost[];

  @ManyToOne(() => Account, (account) => account.posts)
  @JoinColumn([{ name: "id_account", referencedColumnName: "idAccount" }])
  idAccount: Account;

  @OneToMany(() => PostComment, (postComment) => postComment.idPost, { onDelete: 'CASCADE'})
  postComments: PostComment[];
}
