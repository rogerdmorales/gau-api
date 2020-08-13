import * as mongoose from 'mongoose';
import { Comment } from './comment.model';


export const PlaceSchema = new mongoose.Schema({
    placeId: { type: String, required: true },
    averageScore: { type: Number, required: true },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    reviewers: { type: Number, required: true, default: 1 }
});

export interface Place {
    placeId: string,
    averageScore: number,
    comments: Comment[],
    reviewers: number
}