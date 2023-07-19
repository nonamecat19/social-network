import { Module } from '@nestjs/common'
import { ProducerService } from './producer.service'
import { ProducerController } from './producer.controller'
import { ProducerResolver } from './producer.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Producer } from '../../../db/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([Producer]),
  ],
  controllers: [ProducerController],
  providers: [
    ProducerService,
    ProducerResolver,
  ],
})
export class ProducerModule {
}
