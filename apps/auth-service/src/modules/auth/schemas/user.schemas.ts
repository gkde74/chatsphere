import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({
    default: () => uuidv4(),
    unique: true,
    index: true,
  })
  uuid: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    default: null,
  })
  avatar: string;

  @Prop({
    default: 'offline',
    enum: ['online', 'offline', 'away', 'busy'],
  })
  status: string;

  @Prop({
    default: false,
  })
  isEmailVerified: boolean;

  @Prop({
    default: null,
    select: false,
  })
  refreshToken: string;

  @Prop({
    default: null,
  })
  lastSeen: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);