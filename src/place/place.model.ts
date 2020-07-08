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
    ]
});

export interface Place {
    placeId: string,
    averageScore: number,
    comments: Comment[]
}