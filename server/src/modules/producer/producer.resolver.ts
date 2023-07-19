import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Producer } from '../../../db/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProducerAddInput } from '../../graphql-input/producer-add.input'
// import { ProducerEditInput } from '../../graphql-input/producer-edit.input'
// import { EntityWithId } from '../../types/delete-id.types'

@Resolver(() => Producer)
export class ProducerResolver{
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {
  }

  @Query(() => [Producer])
  public async producers(): Promise<Producer[]> {
    return await this.producerRepository.find()
  }

  @Query(() => Producer)
  public async producer(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<Producer> {
    return await this.producerRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  @Mutation(() => Producer, { name: 'producerAdd' })
  public async add(
    @Args('input', { type: () => ProducerAddInput })
      input: ProducerAddInput,
  ): Promise<Producer> {
    return await this.producerRepository.save(input) // (new Producer(input))
  }


  // @Mutation(() => Producer, { name: 'producerEdit' })
  // public async edit(
  //   @Args('id', { type: () => Int })
  //     id: number,
  //   @Args('input', { type: () => ProducerEditInput })
  //     input: ProducerEditInput,
  // ): Promise<Producer> {
  //   const producer = await this.producerRepository.findOneOrFail({
  //     where: {
  //       id,
  //     },
  //   })
  //   return await this.producerRepository.save(
  //     new Producer(Object.assign(producer, input)),
  //   )
  // }
  //
  // @Mutation(() => EntityWithId, { name: 'producerDelete' })
  // public async delete(
  //   @Args('id', { type: () => Int })
  //     id: number,
  // ): Promise<EntityWithId> {
  //   const producer = await this.producerRepository.findOneOrFail({
  //     where: {
  //       id,
  //     },
  //   })
  //   await this.producerRepository.remove(producer)
  //
  //   return new EntityWithId(id)
  // }
}