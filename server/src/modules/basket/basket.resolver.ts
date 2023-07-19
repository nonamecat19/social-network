import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Basket } from '../../../db/entities'
import { Repository } from 'typeorm'
import { BasketAddInput } from '../../graphql-input/basket-add.input'
import { BasketEditInput } from '../../graphql-input/basket-edit.input'
import { EntityWithId } from '../../types/basket.types'


@Resolver(() => Basket)
export class BasketResolver {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
  ) {
  }

  @Query(() => [Basket])
  public async baskets(): Promise<Basket[]> {
    return await this.basketRepository.find()
  }

  @Query(() => Basket)
  public async basket(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<Basket> {
    return await this.basketRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  @Mutation(() => Basket, { name: 'basketAdd' })
  public async add(
    @Args('input', { type: () => BasketAddInput })
      input: BasketAddInput,
  ): Promise<Basket> {
    return await this.basketRepository.save(input) // (new Category(input))
  }

  @Mutation(() => Basket, { name: 'basketEdit' })
  public async edit(
    @Args('id', { type: () => Int })
      id: number,
    @Args('input', { type: () => BasketEditInput })
      input: BasketEditInput,
  ): Promise<Basket> {
    const basket = await this.basketRepository.findOneOrFail({
      where: {
        id,
      },
    })
    return await this.basketRepository.save(
      new Basket(Object.assign(basket, input)),
    )
  }

  @Mutation(() => EntityWithId, { name: 'basketDelete' })
  public async delete(
    @Args('id', { type: () => Int })
      id: number,
  ): Promise<EntityWithId> {
    const basket = await this.basketRepository.findOneOrFail({
      where: {
        id,
      },
    })
    await this.basketRepository.remove(basket)

    return new EntityWithId(id)
  }

}