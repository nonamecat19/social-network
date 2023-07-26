import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator'
import { Group } from '../../../types/account.types'

export class CreateAccountDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  surname: string

  @IsNotEmpty()
  patronymic: string

  @IsNotEmpty()
  @IsEmail()
  login: string


  @IsOptional()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string

  @IsOptional()
  contacts: string

  @IsOptional()
  address: string

  @IsOptional()
  photo_src: string

  @IsOptional()
  group: Group

}
