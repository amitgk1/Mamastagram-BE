import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FollowUserInput } from './dto/follow-user.input';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async findAll() {
    return await this.usersService.findAll();
  }

  @Mutation(() => User)
  followUser(@Args('input') input: FollowUserInput) {
    return this.usersService.followUser(input);
  }
}
