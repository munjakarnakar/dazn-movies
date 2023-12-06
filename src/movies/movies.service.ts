import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import mongoose, { Model } from 'mongoose';
import { Movies } from '../schemas/movies';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movies.name) private movieModel: Model<Movies>) {}

  /**
   * Movies List
   * @returns
   */
  async list(queryParam) {
    try {
      const condition = { is_deleted: false };
      if (queryParam && queryParam.q) {
        queryParam.q = queryParam.q.toUpperCase();
        condition['$or'] = [
          { name: new RegExp(queryParam.q, 'i') },
          { genre: new RegExp(queryParam.q, 'i') },
        ];
      }
      // console.log('Condotion', condition);

      return await this.movieModel.find(condition).exec();
    } catch (e) {
      console.log(`Error in ${this.list.name}`, e);
    }
  }

  /**
   * Add movie
   * @param movie
   * @returns
   */
  async save(movie) {
    try {
      movie.name = movie.name.toUpperCase();
      const resultData = await this.movieModel
        .countDocuments({ name: movie.name, is_deleted: false })
        .exec();
      if (resultData)
        return {
          status: false,
          message: `${movie.name} movie is already exist`,
        };
      const createdMoive = new this.movieModel(movie);
      await createdMoive.save();
      return {
        status: true,
        message: `${movie.name} added successfully to movies list`,
      };
    } catch (e) {
      console.log(`Error in ${this.save.name}`, e);
    }
  }

  /**
   * Update movie
   * @param param
   * @param movie
   * @returns
   */
  async update(param, movie) {
    try {
      movie['updated_date_time'] = new Date();
      movie.name ? (movie.name = movie.name.toUpperCase()) : '';
      const updateMoiveRes = await this.movieModel
        .updateOne({ _id: new mongoose.Types.ObjectId(param.id) }, movie)
        .exec();
      console.log(updateMoiveRes);
      if (updateMoiveRes.modifiedCount) return true;
      return false;
    } catch (e) {
      console.log(`Error in ${this.update.name}`, e);
    }
  }

  /**
   * Delete movie
   * @param movie
   * @returns
   */
  async delete(movie) {
    try {
      const deleteMoive = this.movieModel.updateOne(
        { _id: new mongoose.Types.ObjectId(movie.id) },
        { is_deleted: true, updated_date_time: new Date() },
      );
      const deleteRes = await deleteMoive.exec();
      if (deleteRes.modifiedCount) return true;
      return false;
    } catch (e) {
      console.log(`Error in ${this.delete.name}`, e);
    }
  }

  // async search(movie) {
  //     try {
  //         movie.q = movie.q.toUpperCase();
  //         return await this.movieModel.find({ $or: [{ name: new RegExp(movie.q, 'i') }, { genre: new RegExp(movie.q, 'i') }], is_deleted: false }).exec();
  //     } catch (e) {
  //         console.log(`Error in ${this.search.name}`, e)
  //     }
  // }
}
