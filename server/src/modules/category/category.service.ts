import { BadRequestException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Category } from '../../../db/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryAddInput } from '../../graphql-input/category-add.input'
import { AccountEditInput } from '../../graphql-input/account-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { ErrorsService } from '../../common/errors.service'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly errorsService: ErrorsService,
  ) {
  }

  async findAll() {
    return await this.categoryRepository.find()
  }

  async findOne(id: number) {
    let object = await this.categoryRepository.findOne({
      where: {
        id,
      },
    })
    await this.errorsService.ErrorDataNotFound(object)
    return object
  }

  async create(input: CategoryAddInput) {
    await this.IsCategoryExist(input)
    return await this.categoryRepository.save(input)
  }

  async update(id: number, input: AccountEditInput) {
    const object = await this.findOne(id)
    return await this.categoryRepository.save(
      new Category(Object.assign(object, input)),
    )
  }

  async remove(id: number) {
    const object = await this.findOne(id)
    await this.categoryRepository.remove(object)
    return new EntityWithId(id)
  }

  async IsCategoryExist(input) {
    const isExist = await this.categoryRepository.findBy({
      title: input.title,
    })
    if (isExist.length) {
      throw new BadRequestException('This category already exist!')
    }
  }
}
