import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthHelper } from './auth.helper';
import { AuthLoginInput } from './dto/auth-login.input';
import { AuthRegisterInput } from './dto/auth-register.input';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async login(input: AuthLoginInput) {
    const found = await this.usersService.findUserByEmail(input.email);

    if (!found) {
      throw new NotFoundException(
        `User with email ${input.email} does not exist`,
      );
    }

    const isPasswordValid = await AuthHelper.validate(
      input.password,
      found.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('incorrect password');
    }

    return { token: this.jwt.sign(found.id) };
  }

  async register(input: AuthRegisterInput) {
    const found = await this.usersService.findUserByEmail(input.email);

    if (found) {
      throw new BadRequestException(
        `User with the email ${input.email} already exists`,
      );
    }

    const password = await AuthHelper.hash(input.password);
    const created = await this.usersService.create({
      ...input,
      password,
    });
    return { token: this.jwt.sign(created.id) };
  }

  validateUser(userId: string) {
    return this.usersService.findUserById(userId);
  }
}
