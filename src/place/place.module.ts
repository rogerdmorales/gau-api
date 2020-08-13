import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.model';
import { PlaceController } from './place.controller';
import { PlaceSchema } from './place.model';
import { PlaceService } from './place.service';
import { PlaceRatingHistorySchema } from './place-rating-history.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Place', schema: PlaceSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'PlaceRatingHistory', schema: PlaceRatingHistorySchema }
    ])
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports: [
    PlaceService,
  ]
})
export class PlaceRatingModule {}
