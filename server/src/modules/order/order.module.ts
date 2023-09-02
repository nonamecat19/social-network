import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderResolver } from './order.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Basket, Order, OrderRecord } from '../../../db/entities'
import { ErrorsService } from '../../common/errors.service'
import { BasketService } from '../basket/basket.service'
import { OrderRecordService } from '../orderRecord/orderRecord.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderRecord, Basket]),
  ],
  providers: [
    OrderService,
    OrderResolver,
    ErrorsService,
    BasketService,
    OrderRecordService
  ],
})

export class OrderModule {
}
