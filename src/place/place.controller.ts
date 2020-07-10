import { Controller, Get, Req, UseGuards, Post, Body, Param } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import PlaceRatingDTO from './dto/place-rating.dto';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {

    constructor(private service: PlaceService) {

    }

    @Post('rate')
    @UseGuards(AuthGuard())
    ratePlace(@Body() placeRating: PlaceRatingDTO, @Req() request: Request) {
        return this.service.ratePlace(placeRating, request.user);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    getPlace(@Param() param) {
        return this.service.findPlace(param.id);
    }
}
