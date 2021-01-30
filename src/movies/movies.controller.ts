import { MoviesService } from './movies.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    // return 'This Will return All movies';
    return this.moviesService.getAll();
  }

  // @Get('search')
  // Search(@Query('year') serchingYear: String) {
  //   return `We are Searching for a movie made after : ${serchingYear}`;
  // }

  @Get(':id')
  getOne(@Param('id') moveid: number): Movie {
    return this.moviesService.getOne(moveid);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.moviesService.createMovie(movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  //update      Put = 모든 리소스 Patch = 일부 리소스 업데이트
  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
