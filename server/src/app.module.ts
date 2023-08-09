import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccountModule } from './modules/account/account.module'
import { BasketModule } from './modules/basket/basket.module'
import { CategoryModule } from './modules/category/category.module'
import { FavoriteModule } from './modules/favorite/favorite.module'
import { OrderModule } from './modules/order/order.module'
import { ProducerModule } from './modules/producer/producer.module'
import { ProductModule } from './modules/product/product.module'
import { AuthModule } from './auth/auth.module'
import dbConfig from './common/configs/postgres.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: true, // в продакшені має бути вимкнений
      playground: true,
    }),
    TypeOrmModule.forRootAsync(dbConfig),
    AccountModule,
    BasketModule,
    CategoryModule,
    FavoriteModule,
    OrderModule,
    ProducerModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
}
