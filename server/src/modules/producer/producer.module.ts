import { Module } from '@nestjs/common'
import { ProducerService } from './producer.service'
import { ProducerResolver } from './producer.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Producer } from '../../../db/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([Producer]),
  ],
  providers: [
    ProducerService,
    ProducerResolver,
  ],
})
export class ProducerModule {
}
