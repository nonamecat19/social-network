import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category, Producer, Product } from '../../../db/entities'
import { ErrorsService } from '../../common/errors.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Producer]),
  ],
  providers: [
    ProductService,
    ProductResolver,
    ErrorsService,
  ],
})

export class ProductModule {
}
