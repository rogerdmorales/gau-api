import { Controller, Get, Req, UseGuards, Post, Body, Param } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import PlaceRatingDTO from './dto/place-rating.dto';
import { PlaceService } from './place.service';
import { Comment } from './comment.model';
import { request } from 'http';

@Controller('place')
export class PlaceController {

    constructor(private service: PlaceService) {

    }

    @Post('rate')
    @UseGuards(AuthGuard())
    ratePlace(@Body() placeRating: PlaceRatingDTO, @Req() request: Request) {
        return this.service.ratePlace(placeRating, request.user);
    }

    @Post(':id/comments/:commentId/reply')
    @UseGuards(AuthGuard())
    replyComment(@Param() param, @Body() comment: Comment, @Req() request: Request) {
        return this.service.replyComment(param.id, param.commentId, comment, request.user);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    getPlace(@Param() param) {
        return this.service.findPlace(param.id);
    }
}
