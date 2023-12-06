import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { MoviesService } from './movies.service';
import { MoiveDTO } from './dto/addMoive.dto';
import { UpdateMoiveDTO } from './dto/updateMoive.dto';
import { UpdateParamDTO } from './dto/updateParam.dto';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/')
  @ApiOperation({ summary: 'List all the movies in the lobby' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        movies: [
          {
            _id: '6570253e38b34bf129dc3552',
            name: 'ANIMAL',
            genre: 'ACTION',
            rating: 4,
            is_deleted: false,
            streamingLink: 'https://www.movies.com/animal',
            created_date_time: '2023-12-06T07:39:07.603Z',
          },
        ],
      },
    },
  })
  async list(
    @Query() queryParam: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const moviesList: any = await this.moviesService.list(queryParam);
      return res.status(HttpStatus.OK).send({ data: moviesList });
    } catch (e) {
      console.log(`Error in ${this.list.name}`, e);
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Add a new movie to the lobby' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        message: 'DASARA added successfully to movies list',
      },
    },
  })
  async saveMovie(
    @Body() moiveDTO: MoiveDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const saveRes = await this.moviesService.save(moiveDTO);
      if (saveRes.status)
        return res.status(HttpStatus.OK).send({ message: saveRes.message });
      else
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: saveRes.message });
    } catch (e) {
      console.log(`Error in ${this.list.name}`, e);
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: `Update an existing movie's information (title, genre, rating, or streaming link)`,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        message: 'Updated successfully',
      },
    },
  })
  async updateMovie(
    @Param() param: UpdateParamDTO,
    @Body() body: UpdateMoiveDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const updateRes = await this.moviesService.update(param, body);
      if (updateRes)
        return res
          .status(HttpStatus.OK)
          .send({ message: 'Updated successfully' });
      else
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Unable to update' });
    } catch (e) {
      console.log(`Error in ${this.list.name}`, e);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete a movie from the lobby` })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        message: 'Deleted successfully',
      },
    },
  })
  async deleteMovie(
    @Param() param: UpdateParamDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const deleteRes = await this.moviesService.delete(param);
      if (deleteRes)
        return res
          .status(HttpStatus.OK)
          .send({ message: 'Deleted successfully' });
      else
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Unable to delete' });
    } catch (e) {
      console.log(`Error in ${this.list.name}`, e);
    }
  }
}
