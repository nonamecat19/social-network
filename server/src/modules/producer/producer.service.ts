import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Producer } from '../../../db/entities'
import { Repository } from 'typeorm'
import { ProducerEditInput } from '../../graphql-input/producer-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { ProducerAddInput } from '../../graphql-input/producer-add.input'
import { ErrorsService } from '../../common/errors.service'

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
    private readonly errorsService: ErrorsService,
  ) {
  }

  async findAll() {
    return await this.producerRepository.find()
  }

  async findOne(id: number) {
    let object = await this.producerRepository.findOne({
      where: {
        id,
      },
    })
    await this.errorsService.ErrorDataNotFound(object)
    return object
  }

  async create(input: ProducerAddInput) {
    await this.IsCategoryExist(input)
    return await this.producerRepository.save(input)
  }

  async update(id: number, input: ProducerEditInput) {
    const producer = await this.findOne(id)
    return await this.producerRepository.save(
      new Producer(Object.assign(producer, input)),
    )
  }

  async remove(id: number) {
    const producer = await this.findOne(id)
    await this.producerRepository.remove(producer)
    return new EntityWithId(id)
  }

  async IsCategoryExist(input) {
    const isExist = await this.producerRepository.findBy({
      name: input.name,
    })
    if (isExist.length) {
      throw new BadRequestException('This producer already exist!')
    }
  }
}
