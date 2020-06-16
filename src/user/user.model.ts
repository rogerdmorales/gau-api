
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasDisability: { type: Boolean, required: false, default: false },
    photo: { type: String, required: false },
    active: { type: Boolean, required: false, default: true }
});

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    hasDisability: boolean;
    photo: string;
    active: boolean;
}