import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendshipRequestDto } from './create-friendship-request.dto';

export class UpdateFriendshipRequestDto extends PartialType(CreateFriendshipRequestDto) {}
