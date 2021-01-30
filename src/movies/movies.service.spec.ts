import { Movie } from './entities/movies.entity';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { execPath } from 'process';
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
    it('should retrun an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne', () => {
    it('should retrun a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999); // 에러발생
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID : 999 Not Found');
      }
    });
  });
  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    });
    it('should retrun a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('CrateMovie', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'Update Test' });
      const Movie = service.getOne(1);
      expect(Movie.title).toEqual('Update Test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
