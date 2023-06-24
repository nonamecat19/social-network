import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccountModule } from './modules/account/account.module'
import { FriendshipModule } from './modules/friendship/friendship.module'
import { FriendshipRequestModule } from './modules/friendship-request/friendship-request.module'
import { LikeCommentModule } from './modules/like-comment/like-comment.module'
import { LikePostModule } from './modules/like-post/like-post.module'
import { PostModule } from './modules/post/post.module'
import { PostCommentModule } from './modules/post-comment/post-comment.module'

import { AuthModule } from './auth/auth.module';

import {Account, Friendship, FriendshipRequest, LikeComment, LikePost, Post, PostComment} from '../db/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [Account, Friendship, FriendshipRequest, LikeComment, LikePost, Post, PostComment]
      }),
    }),
    AccountModule,
    FriendshipModule,
    FriendshipRequestModule,
    LikeCommentModule,
    LikePostModule,
    PostModule,
    PostCommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
