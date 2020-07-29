import * as mongoose from 'mongoose';
import { User } from '../user/user.model';
import * as moment from 'moment-timezone';

export const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    likes: { type: Number, required: false, default: 0 },
    date: { type: String, required: true, default: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY')},
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    responses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

export interface Comment {
    _id: string,
    content: string,
    author: User,
    place: any,
    likes: number,
    parent: Comment,
    responses: Comment[]
}