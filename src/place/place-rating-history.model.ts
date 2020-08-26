import * as mongoose from 'mongoose';
import { User } from 'src/user/user.model';
import * as moment from 'moment-timezone';


export const PlaceRatingHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  placeId: { type: String, required: true },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  score: { type: Number, required: true },
  question1: { type: Number, required: true },
  question2: { type: Number, required: true },
  question3: { type: Number, required: true },
  question4: { type: Number, required: true },
  question5: { type: Number, required: true },
  date: { type: String, required: true, default: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY')},
});


export interface PlaceRatingHistory {
  user: User,
  placeId: string,
  comment: Comment,
  score: number,
  question1: number,
  question2: number,
  question3: number,
  question4: number,
  question5: number,
  date: string,
}