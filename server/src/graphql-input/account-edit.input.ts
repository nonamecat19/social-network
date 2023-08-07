import { InputType, PartialType } from '@nestjs/graphql'
import { AccountAddInput } from './account-add.input'

@InputType()
export class AccountEditInput extends PartialType(AccountAddInput) {
}