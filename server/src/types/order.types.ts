import { registerEnumType } from '@nestjs/graphql'

export enum Status{
  rejected = 'rejected',
  accepted = 'accepted',
  reviewed = 'reviewed',
  notReviewed = 'not reviewed',
}

registerEnumType(Status, {
  name: 'Status',
});
