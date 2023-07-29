import { Module } from '@nestjs/common'
import { BasketService } from './basket.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Basket  } from '../../../db/entities'
import { BasketResolver } from './basket.resolver'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Basket,

    ]),
  ],
  providers: [
    BasketService,

    BasketResolver,
  ],
})
export class BasketModule {
}
