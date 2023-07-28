import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category, Producer, Product } from '../../../db/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Producer])
  ] ,
  providers: [
    ProductService,
    ProductResolver
  ]
})
export class ProductModule {}
