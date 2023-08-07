import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order_baskets_basket } from '../../../db/entities'
import { OrderBasketService } from './orderBasket.service'
import { OrderBasketResolver } from './orderBasket.resolver'
import { ErrorsService } from '../../common/errors.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order_baskets_basket]),
  ],
  providers: [
    OrderBasketService,
    OrderBasketResolver,
    ErrorsService,
  ],
})

export class OrderBasketModule {
}
