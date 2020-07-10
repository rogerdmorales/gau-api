import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.model';
import PlaceRatingDTO from './dto/place-rating.dto';
import { Answer } from './enum/answer.enum';
import { Place } from './place.model';

@Injectable()
export class PlaceService {

    constructor(
        @InjectModel('Place') private readonly placeModel: Model<Place>,
        @InjectModel('Comment') private readonly commentModel: Model<Comment>
    ) {

    }

    async ratePlace(placeRating: PlaceRatingDTO, user: any) {
        let place = await this.findById(placeRating.placeId);
        const userScore = this.calculateScore(placeRating.answers);
        let placeId = '';

        if (!place) {
            place = {
                placeId: placeRating.placeId,
                averageScore: this.calculateScore(placeRating.answers)
            }
            place = await this.placeModel(place).save();
            placeId = place._id;
        } else {
            place.averageScore = (place.averageScore + userScore) / 2;
            placeId = place._id;
            await this.placeModel.findByIdAndUpdate(placeId, place);
        }

        const comment = {
            content: placeRating.comment,
            author: user._id,
            place: placeId
        };
        const commentId = await new this.commentModel(comment).save();

        place.comments.push(commentId);
        await this.placeModel(place).save();
    }

    async findPlace(placeId: string) {
        return await this.placeModel.findOne({ placeId })
            .populate('comments');
    }

    async findById(placeId: string) {
        return await this.placeModel.findOne({ placeId });
    }

    calculateScore(answers: string[]): number {
        let sumScores = 0;
        let numAnswers = 0;

        answers.forEach(answer => {
            if (answer === Answer.NO) {
                numAnswers++;
            } else if (answer === Answer.YES) {
                sumScores += 5;
                numAnswers++;
            }
        });

        return sumScores / numAnswers;
    }
}
