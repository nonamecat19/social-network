import { registerEnumType } from '@nestjs/graphql'

export enum Group {
  NewBuyer = 'New buyer',
  RareBuyer = 'Rare buyer',
  FrequentBuyer = 'Frequent buyer',
  VIP = 'VIP',
}

registerEnumType(Group)