import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthLoginInput } from './dto/auth-login.input';
import { AuthRegisterInput } from './dto/auth-register.input';
import { UserToken } from './models/user-token';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserToken)
  async login(@Args('input') input: AuthLoginInput) {
    return await this.authService.login(input);
  }

  @Mutation(() => UserToken)
  async register(@Args('input') input: AuthRegisterInput) {
    return await this.authService.register(input);
  }
}
