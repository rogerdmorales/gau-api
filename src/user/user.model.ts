
import * as mongoose from 'mongoose';
import { AuthMethod } from '../auth/enum/auth-method';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    hasDisability: { type: Boolean, required: false, default: false },
    photo: { type: String, required: false },
    active: { type: Boolean, required: false, default: true },
    authMethod: { type: String, required: true, default: AuthMethod.APP }
});

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    hasDisability: boolean;
    photo: string;
    active: boolean;
    authMethod: string;
}