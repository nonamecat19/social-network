import { BadRequestException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Category } from '../../../db/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryAddInput } from '../../graphql-input/category-add.input'
import { AccountEditInput } from '../../graphql-input/account-edit.input'
import { EntityWithId } from '../../types/delete-id.types'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
  }

  async findAll() {
    return await this.categoryRepository.find()
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  async create(input: CategoryAddInput) {
    const isExist = await this.categoryRepository.findBy({
      title: input.title,
    })

    if (isExist.length) {
      throw new BadRequestException('This category already exist!')
    }

    return await this.categoryRepository.save(input)
  }

  async update(id: number, input: AccountEditInput) {
    const category = await this.findOne(id)
    return await this.categoryRepository.save(
      new Category(Object.assign(category, input)),
    )
  }

  async remove(id: number) {
    const category = await this.findOne(id)
    await this.categoryRepository.remove(category)
    return new EntityWithId(id)
  }
}
