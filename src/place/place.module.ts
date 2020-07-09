import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.model';
import { PlaceController } from './place.controller';
import { PlaceSchema } from './place.model';
import { PlaceService } from './place.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Place', schema: PlaceSchema },
      { name: 'Comment', schema: CommentSchema },
    ])
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports: [
    PlaceService,
  ]
})
export class PlaceRatingModule {}
