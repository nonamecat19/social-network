import { IsNotEmpty, IsOptional, MinLength } from 'class-validator'


export class CreateProducerDto {

  @IsNotEmpty()
  name: string

  @IsOptional()
  @MinLength(4, { message: 'description must be at least 4 characters long' })
  description: string

  @IsOptional()
  photo_src: string

}
