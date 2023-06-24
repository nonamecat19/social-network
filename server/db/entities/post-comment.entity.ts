import {LikeComment, Account, Post} from './index';
import {
  Column, CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'

@Index("post_comment_pkey", ["idComment"], { unique: true })
@Entity("post_comment", { schema: "public" })
export class PostComment {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_comment" })
  idComment: number;

  @Column("text", { name: "text_comment" })
  textComment: string;

  // @Column("timestamp without time zone", {
  //   name: "dateofcomment",
  //   nullable: true,
  //   default: () => "CURRENT_TIMESTAMP",
  // })
  // dateofcomment: Date | null;

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

  @OneToMany(() => LikeComment, (likeComment) => likeComment.idComment, { onDelete: 'CASCADE'})
  likeComments: LikeComment[];

  @ManyToOne(() => Account, (account) => account.postComments)
  @JoinColumn([{ name: "id_account", referencedColumnName: "idAccount" }])
  idAccount: Account;

  @ManyToOne(() => Post, (post) => post.postComments)
  @JoinColumn([{ name: "id_post", referencedColumnName: "idPost" }])
  idPost: Post;
}
