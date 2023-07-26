import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductResolver } from './product.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category, Producer, Product } from '../../../db/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Producer])
  ] ,
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductResolver
  ]
})
export class ProductModule {}
