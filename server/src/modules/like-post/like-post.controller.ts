import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikePostService } from './like-post.service';
import { CreateLikePostDto } from './dto/create-like-post.dto';
import { UpdateLikePostDto } from './dto/update-like-post.dto';

@Controller('like-post')
export class LikePostController {
  constructor(private readonly likePostService: LikePostService) {}

  @Post()
  create(@Body() createLikePostDto: CreateLikePostDto) {
    return this.likePostService.create(createLikePostDto);
  }

  @Get()
  findAll() {
    return this.likePostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likePostService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikePostDto: UpdateLikePostDto) {
    return this.likePostService.update(+id, updateLikePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likePostService.remove(+id);
  }
}
