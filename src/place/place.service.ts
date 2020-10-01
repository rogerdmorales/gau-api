import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.model';
import PlaceRatingDTO from './dto/place-rating.dto';
import { Answer } from './enum/answer.enum';
import { Place } from './place.model';
import { PlaceRatingHistory } from './place-rating-history.model';

@Injectable()
export class PlaceService {

    constructor(
        @InjectModel('Place') private readonly placeModel: Model<Place>,
        @InjectModel('Comment') private readonly commentModel: Model<Comment>,
        @InjectModel('PlaceRatingHistory') private readonly placeRatingHistoryModel: Model<PlaceRatingHistory>
    ) { }

    async ratePlace(placeRating: PlaceRatingDTO, user: any) {
        let place = await this.findById(placeRating.placeId);
        const userScore = this._calculateScore(placeRating);
        let placeId = '';

        if (!place) {
            place = {
                placeId: placeRating.placeId,
                averageScore: userScore
            }
            place = await this.placeModel(place).save();
            placeId = place._id;
        } else {
            const userRatings = await this.placeRatingHistoryModel.find({ placeId: place.placeId });
            let sumScores = 0;
            userRatings.forEach(userRating => {
                sumScores += userRating.score;
            });
           
            place.averageScore = (sumScores + userScore) / (userRatings.length + 1);
            place.reviewers++;
            placeId = place._id;
            await this.placeModel.findByIdAndUpdate(placeId, place);
        }

        const comment = {
            content: placeRating.comment,
            author: user._id,
            place: placeId
        };
        const commentId = await this.commentModel(comment).save();

        place.comments.push(commentId);

        const placeRatingHistory = {
            ...placeRating,
            comment: commentId,
            score: userScore,
            user: user._id
        }

        const placeRatingHistoryId = await this.placeRatingHistoryModel(placeRatingHistory).save();
        await this.commentModel.findByIdAndUpdate(commentId, { placeRatingHistory: placeRatingHistoryId });
        await this.placeModel(place).save();
    }

    async updatePlaceRating(placeRating: PlaceRatingDTO, user: any) {
        const deletedRating = await this.placeRatingHistoryModel.findOneAndDelete(
            {
                user: user._id,
                placeId: placeRating.placeId
            }
        );

        await this.commentModel.deleteOne(
            {
                author: user._id,
                placeRatingHistory: deletedRating._id
            }
        );

        await this.ratePlace(placeRating, user);
    }

    async replyComment(placeId: string, parentId: string, comment: Comment, user: any) {
        const parentComment = await this.commentModel.findById(parentId);
        comment.parent = parentComment._id;
        comment.author = user._id;
        comment.place = placeId;
        comment = await this.commentModel(comment).save();

        parentComment.responses.push(comment._id);

        const updatedComment = await this.commentModel.findByIdAndUpdate(parentId, parentComment, { new: true })
            .populate({
                path: 'responses',
                populate: { path: 'author' }
            })
            .populate('author')
            .populate('placeRatingHistory');

        return updatedComment;
    }

    async likeComment(placeId: any, commentId: any) {
        const comment = await this.commentModel.findOne({ place: placeId, _id: commentId });
        comment.likes++;
        await this.commentModel.findByIdAndUpdate(commentId, comment);
    }

    async findPlace(placeId: string) {
        const place = await this.placeModel.findOne({ placeId });

        if (!place) {
            return null;
        }

        const comments = await this.commentModel.find({ place: place._id, parent: null })
            .populate({
                path: 'responses',
                populate: { path: 'author' }
            })
            .populate('author')
            .populate('placeRatingHistory');
        place.comments = comments;

        return place;
    }

    async findById(placeId: string) {
        return await this.placeModel.findOne({ placeId });
    }

    async findPlaceRatingsByUser(user: any) {
        return await this.placeRatingHistoryModel.find({ user: user._id })
            .populate('comment');
    }

    async findPlaceRatingByUserAndPlaceId(user: any, placeId: string) {
        return await this.placeRatingHistoryModel.findOne({ user: user._id, placeId })
            .populate('comment');
    }

    async findPlaceRatingsSummary(placeId: string) {
        const userRatings = await this.placeRatingHistoryModel.find({ placeId });
        let question1Score = 0, question2Score = 0, question3Score = 0, question4Score = 0, question5Score = 0;
       userRatings.forEach(userRating => {
           question1Score += userRating.question1;
           question2Score += userRating.question2;
           question3Score += userRating.question3;
           question4Score += userRating.question4;
           question5Score += userRating.question5;
       });

       return {
           question1: (question1Score / userRatings.length) >= 2.5,
           question2: (question2Score / userRatings.length) >= 2.5,
           question3: (question3Score / userRatings.length) >= 2.5,
           question4: (question4Score / userRatings.length) >= 2.5,
           question5: (question5Score / userRatings.length) >= 2.5,
       }
    }

    private _calculateScore(placeRating: PlaceRatingDTO): number {
        const sumScores = placeRating.question1
            + placeRating.question2
            + placeRating.question3
            + placeRating.question4
            + placeRating.question5;

        return sumScores / 5;
    }
}
