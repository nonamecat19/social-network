import {
  Column, CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'

import { Friendship } from "./Friendship";
import { FriendshipRequest } from "./FriendshipRequest";
import { LikeComment } from "./LikeComment";
import { LikePost } from "./LikePost";
import { Post } from "./Post";
import { PostComment } from "./PostComment";

@Index("account_pkey", ["idAccount"], { unique: true })
@Entity("account", { schema: "public" })
export class Account {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_account" })
  idAccount: number;

  @Column("character varying", {
    name: "name",
    nullable: true,
    length: 255,
  })
  name: string | null;

  @Column("character varying", {
    name: "surname",
    nullable: true,
    length: 255,
  })
  surname: string | null;

  @Column("character varying", { name: "nickname", length: 255 })
  nickname: string;

  @Column("date", { name: "dateOfbBirth", nullable: true })
  dateOfBirth: string | null;

  @Column("character varying", { name: "password", length: 255 })
  password: string;

  @Column("character varying", { name: "photo_src", nullable: true })
  photoSrc: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  // @Column("timestamp without time zone", {
  //   name: "dateofregistration",
  //   nullable: true,
  //   default: () => "CURRENT_TIMESTAMP",
  // })
  // dateofregistration: Date | null;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;



  @OneToMany(() => Friendship,
    (friendship) => friendship.idAccount, { onDelete: 'CASCADE'})
  friendships: Friendship[];

  @OneToMany(() => Friendship,
    (friendship) => friendship.idAccount2, { onDelete: 'CASCADE'})
  friendships2: Friendship[];

  @OneToMany(
    () => FriendshipRequest,
    (friendshipRequest) => friendshipRequest.idAccount, { onDelete: 'CASCADE'})
  friendshipRequests: FriendshipRequest[];

  @OneToMany(
    () => FriendshipRequest,
    (friendshipRequest) => friendshipRequest.idAccount2, { onDelete: 'CASCADE'})
  friendshipRequests2: FriendshipRequest[];

  @OneToMany(() => LikeComment,
    (likeComment) => likeComment.idAccount, { onDelete: 'CASCADE'})
  likeComments: LikeComment[];

  @OneToMany(() => LikePost,
    (likePost) => likePost.idAccount, { onDelete: 'CASCADE'})
  likePosts: LikePost[];

  @OneToMany(() => Post,
    (post) => post.idAccount, { onDelete: 'CASCADE'})
  posts: Post[];

  @OneToMany(() => PostComment,
    (postComment) => postComment.idAccount, { onDelete: 'CASCADE'})
  postComments: PostComment[];
}
