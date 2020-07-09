import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    likes: { type: Number, required: false, default: 0 },
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
    content: string,
    author: string,
    place: string,
    likes: number,
    parent: string,
    responses: Comment[]
}