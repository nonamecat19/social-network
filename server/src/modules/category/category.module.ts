import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from '../../../db/entities'
import { CategoryResolver } from './category.resolver'

@Module({
  imports: [
    TypeOrmModule.forFeature([Category])
   ] ,
  providers: [
    CategoryService,
    CategoryResolver
  ]
})
export class CategoryModule {}
