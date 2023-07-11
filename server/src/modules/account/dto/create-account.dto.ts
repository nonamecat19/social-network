import { IsEmail, MinLength } from 'class-validator'

export class CreateAccountDto {

  name: string

  surname: string

  patronymic: string

  @IsEmail()
  login: string

  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string | null

  contacts: string | null

  address: string | null

  photo_src: string | null

  group: 'New buyer' | 'Rare buyer' | 'Frequent buyer' | 'VIP' | null

}
