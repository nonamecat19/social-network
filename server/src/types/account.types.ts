import { registerEnumType } from '@nestjs/graphql'

export enum Group {
  newBuyer = 'new buyer',
  rareBuyer = 'rare buyer',
  frequentBuyer = 'frequent buyer',
  VIP = 'VIP',
}

registerEnumType(Group, {
  name: 'Group',
});
