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
            place.reviewers++;
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

    async replyComment(placeId: string, parentId: string, comment: Comment, user: any) {
        const parentComment = await this.commentModel.findById(parentId);
        comment.parent = parentComment._id;
        comment.author = user._id;
        comment.place = placeId;
        comment = await this.commentModel(comment).save();

        parentComment.responses.push(comment._id);
        
        await this.commentModel.findByIdAndUpdate(parentId, parentComment);
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
            .populate('author');
        place.comments = comments;

        return place;
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
