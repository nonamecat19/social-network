import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderResolver } from './order.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from '../../../db/entities'
import { ErrorsService } from '../../common/errors.service'
import { Order_baskets_basket } from '../../../db/entities'
import { OrderBasketService } from '../OrderBasket/orderBasket.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Order_baskets_basket]),
  ],
  providers: [
    OrderService,
    OrderResolver,
    ErrorsService,
    OrderBasketService,
  ],
})

export class OrderModule {
}
