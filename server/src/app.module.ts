import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
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

@Module({
  imports: [DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DB_HOST'),
    //     port: configService.get('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     synchronize: true,
    //     entities: [__dirname + '/**/*.entity{.js, .ts}']
    //   }),
    //   inject: [ConfigService],
    // }),
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
