import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from '../../../db/entities'
import { CategoryResolver } from './category.resolver'
import { ErrorsService } from '../../common/errors.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
  ],
  providers: [
    CategoryService,
    CategoryResolver,
    ErrorsService,
  ],
})

export class CategoryModule {
}
