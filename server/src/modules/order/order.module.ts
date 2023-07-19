import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderResolver } from './order.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from '../../../db/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order])
  ] ,
  controllers: [OrderController],
  providers: [
    OrderService,
    // OrderResolver
  ]
})
export class OrderModule {}
