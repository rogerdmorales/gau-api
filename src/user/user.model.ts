
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    hasDisability: { type: Boolean, required: true },
    photo: { type: String, required: false },
    active: { type: Boolean, required: true }
});

export interface User {
    id: String;
    name: String;
    email: String;
    password: String;
    hasDisability: Boolean;
    photo: String;
    active: Boolean;
}