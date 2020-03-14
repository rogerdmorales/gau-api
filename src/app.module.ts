import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://gau_mongo:g4u_m0ng0@cluster0-vhdtz.mongodb.net/gau-db?retryWrites=true&w=majority"),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
