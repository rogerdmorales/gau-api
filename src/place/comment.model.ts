import * as mongoose from 'mongoose';
import { User } from '../user/user.model';
import * as moment from 'moment-timezone';
import { PlaceRatingHistory } from './place-rating-history.model';

export const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    placeRatingHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'PlaceRatingHistory' },
    likes: { type: Number, required: false },
    userLikes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
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
    placeRatingHistory: PlaceRatingHistory,
    userLikes: [],
    likes: number,
    parent: Comment,
    responses: Comment[]
}