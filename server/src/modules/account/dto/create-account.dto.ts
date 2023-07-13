import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator'

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
  group: 'New buyer' | 'Rare buyer' | 'Frequent buyer' | 'VIP'

}
