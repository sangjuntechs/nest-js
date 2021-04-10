import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchYear: string) {
    return `${searchYear}년도 이후의 영화들을 검색합니다.`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with the id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    return `movie name is ${movieData.name} director is ${movieData.director}`;
  }

  @Delete()
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch('/:id')
  update(@Param('id') movieId: string, @Body() updateData) {
    return {
      updateMovie: movieId,
      ...updateData,
    };
  }
}
