import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Producer } from '../../../db/entities'
import { Repository } from 'typeorm'
import { ProducerEditInput } from '../../graphql-input/producer-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { ProducerAddInput } from '../../graphql-input/producer-add.input'

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {
  }

  async findAll() {
    return await this.producerRepository.find()
  }

  async findOne(id: number) {
    return await this.producerRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  async create(input: ProducerAddInput) {
    const isExist = await this.producerRepository.findBy({
      name: input.name,
    })

    if (isExist.length) {
      throw new BadRequestException('This category already exist!')
    }

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
}
