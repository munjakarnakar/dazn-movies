import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [MoviesModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
