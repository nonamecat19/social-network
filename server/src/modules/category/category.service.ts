import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm'
import { Category } from '../../../db/entities'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const isExist = await this.categoryRepository.findBy({
      title: createCategoryDto.title
    })

    if(isExist.length){
      throw new BadRequestException('This category already exist!')
    }

    const newCategory = {
      title: createCategoryDto.title,
      description: createCategoryDto.description,
      photo_src: createCategoryDto.photo_src
    }

    return await this.categoryRepository.save(newCategory)
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.find(
      //where{}
    );
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
