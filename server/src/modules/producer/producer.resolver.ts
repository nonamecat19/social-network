import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Producer } from '../../../db/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProducerAddInput } from '../../graphql-input/producer-add.input'
import { ProducerEditInput } from '../../graphql-input/producer-edit.input'
import { EntityWithId } from '../../types/delete-id.types'
import { ProducerService } from './producer.service'

@Resolver(() => Producer)
export class ProducerResolver {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
    private readonly producerService: ProducerService,
  ) {
  }

  @Query(() => [Producer])
  public async producers(): Promise<Producer[]> {
    return await this.producerService.findAll()
  }

  @Query(() => Producer, { description: '---' })
  public async producer(
    @Args('id', { type: () => Int }) id: number): Promise<Producer> {
    return await this.producerService.findOne(id)
  }


  @Mutation(() => Producer, { name: 'producerAdd' })
  public async add(
    @Args('input', { type: () => ProducerAddInput }) input: ProducerAddInput): Promise<Producer> {
    return await this.producerService.create(input)
  }

  @Mutation(() => Producer, { name: 'producerEdit' })
  public async edit(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => ProducerEditInput }) input: ProducerEditInput): Promise<Producer> {
    return await this.producerService.update(id, input)
  }

  @Mutation(() => EntityWithId, { name: 'producerDelete', description: '---' })
  public async delete(
    @Args('id', { type: () => Int }) id: number): Promise<EntityWithId> {
    return await this.producerService.remove(id)
  }
}