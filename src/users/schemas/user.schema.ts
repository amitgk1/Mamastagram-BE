import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop()
  email: string;

  @Field({ nullable: true })
  @Prop()
  firstName?: string;

  @Field({ nullable: true })
  @Prop()
  lastName?: string;

  @Field(() => [User])
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  following: User[];

  @Prop()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
