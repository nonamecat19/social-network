import { Module } from '@nestjs/common'
import { OrderRecordService } from './orderRecord.service'
import { OrderRecordResolver } from './orderRecord.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Basket, Order } from '../../../db/entities'
import { ErrorsService } from '../../common/errors.service'
import { BasketService } from '../basket/basket.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Basket]),
  ],
  providers: [
    OrderRecordService,
    OrderRecordResolver,
    ErrorsService,
    BasketService
  ],
})

export class OrderRecordModule {
}
