import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FollowUserInput {
  @Field(() => ID)
  currentUserId: string;

  @Field(() => ID)
  followingUserId: string;
}
