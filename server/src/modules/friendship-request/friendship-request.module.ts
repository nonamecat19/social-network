import { Module } from '@nestjs/common';
import { FriendshipRequestService } from './friendship-request.service';
import { FriendshipRequestController } from './friendship-request.controller';

@Module({
  controllers: [FriendshipRequestController],
  providers: [FriendshipRequestService]
})
export class FriendshipRequestModule {}
