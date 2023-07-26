import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Basket } from '../../../db/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([Basket])
  ] ,
  controllers: [BasketController],
  providers: [
    BasketService,
    // BasketResolver
  ],
})
export class BasketModule {}
