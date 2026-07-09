import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../schemas/user.schemas';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: Partial<User>): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async findOne(filter: Record<string, unknown>): Promise<UserDocument | null> {
    return this.userModel.findOne(filter).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async update(
    filter: Record<string, unknown>,
    update: Record<string, unknown>,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findOneAndUpdate(filter, update, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async delete(filter: Record<string, unknown>): Promise<UserDocument | null> {
    return this.userModel.findOneAndDelete(filter).exec();
  }

  async exists(filter: Record<string, unknown>): Promise<boolean> {
    return (await this.userModel.countDocuments(filter)) > 0;
  }
}