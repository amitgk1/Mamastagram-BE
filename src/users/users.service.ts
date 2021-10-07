import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthRegisterInput } from 'src/auth/dto/auth-register.input';
import { FollowUserInput } from './dto/follow-user.input';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    return this.userModel.find().populate('following').exec();
  }

  async create(input: AuthRegisterInput) {
    const createdUser = new this.userModel(input);
    return createdUser.save();
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findUserById(id: string) {
    return this.userModel.findById(id);
  }

  async followUser({ currentUserId, followingUserId }: FollowUserInput) {
    return this.userModel.findById(currentUserId, null, null, (err, curr) => {
      if (!err) {
        curr.following.push(followingUserId as any);
        curr.save();
      }
    });
  }
}
