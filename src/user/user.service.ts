import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { AuthMethod } from '../auth/enum/auth-method';


@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {

    }

    async create(user: User) {
        if (user.authMethod !== AuthMethod.GOOGLE) {
            const hash = await this.getHash(user.password);
            user.password = hash;
        }

        user.active = true;
        user.hasDisability = false;
        const result = await new this.userModel(user).save();
  
        return { "id": result.id };
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email });
    }

    async findById(id: number) {
        return await this.userModel.findById(id)
    }

    async update(userId: number, updatedUser: User) {
        const user = await this.userModel.findById(userId);

        if (updatedUser.password) {
            const newPasswordHash = await this.getHash(updatedUser.password);
            user.password = newPasswordHash;
        }

        user.name = updatedUser.name;
        user.photo = updatedUser.photo;

        return await this.userModel.findByIdAndUpdate(userId, user, { new: true });
    }

    async remove(userId: number) {
        return await this.userModel.findByIdAndDelete(userId);
    }

    private getHash(plainTextPassowrd: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    reject('Couldn\'t generate salt');
                }
                bcrypt.hash(plainTextPassowrd, salt, function (err, hash) {
                    if (err) {
                        reject('Couldn\'t generate hash');
                    }
                    resolve(hash);
                })
            })
        })
    }
}
