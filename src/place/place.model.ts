import * as mongooose from 'mongoose';
import { Comment } from './comment.model';


export const PlaceSchema = new mongooose.Schema({
    placeId: { type: String, required: true },
    averageScore: { type: Number, required: true },
    comments: [
        {
            type: mongooose.Schema.Types.ObjectId,
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