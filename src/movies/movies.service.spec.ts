import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movies',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movies', () => {
      service.create({
        title: 'Test Movies',
        genres: ['test'],
        year: 2000,
      });
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterMovies = service.getAll();
      expect(afterMovies.length).toBeLessThan(allMovies.length);
    });
    it('delete 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('createOne', () => {
    it('create Movies', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movies',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movies',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'updated Test Movie' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated Test Movie');
    });
    it('update 404 error', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
