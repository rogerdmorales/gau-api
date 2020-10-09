import { Controller, Get, Req, UseGuards, Post, Body, Param, Put, Query } from '@nestjs/common';
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
    
    @Put('rate')
    @UseGuards(AuthGuard())
    updatePlaceRating(@Body() placeRating: PlaceRatingDTO, @Req() request: Request) {
        return this.service.updatePlaceRating(placeRating, request.user);
    }

    @Get('user/ratings')
    @UseGuards(AuthGuard())
    getPlaceRatings(@Req() request: Request) {
        return this.service.findPlaceRatingsByUser(request.user);
    }

    @Get('/places/findplacebyplaceids?:placeIds')
    getPlacesByPlaceIds(@Query() query) {
        return this.service.findPlacesByPlaceIds(query.placeIds);
    }

    @Get(':id/user/ratings')
    @UseGuards(AuthGuard())
    getPlaceRatingsByUserAndPlace(@Param() param, @Req() request: Request) {
        return this.service.findPlaceRatingByUserAndPlaceId(request.user, param.id);
    }

    @Post(':id/comments/:commentId/reply')
    @UseGuards(AuthGuard())
    replyComment(@Param() param, @Body() comment: Comment, @Req() request: Request) {
        return this.service.replyComment(param.id, param.commentId, comment, request.user);
    }

    @Post(':id/comments/:commentId/like')
    @UseGuards(AuthGuard())
    likeComment(@Param() param) {
        return this.service.likeComment(param.id, param.commentId);
    }
    
    @Get(':id')
    getPlace(@Param() param) {
        return this.service.findPlace(param.id);
    }

    @Get(':id/ratings/summary')
    getPlaceRatingsSummary(@Param() param) {
        return this.service.findPlaceRatingsSummary(param.id);
    }


}
