import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';


@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {

    }

    async create(doc: User) {
        const result = await new this.userModel(doc).save();
        return {"id" : result.id};
    }

    async findById(id: number) {
        return await this.userModel.findById(id)
    }

    async update(userId: number, doc: User) {
        return await this.userModel.findByIdAndUpdate(userId, doc);
    }

    async remove(userId: number) {
        return await this.userModel.findByIdAndDelete(userId);
    }
}
