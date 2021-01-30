import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      // 테스트시에도  실제 환경이랑 똑같이 설정해야한다.
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('홈페이지 입니다.');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()) //
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 20000,
          genres: ['Test'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 20000,
          genres: ['Test'],
          other: 'thing',
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()) //
        .get('/movies/1')
        .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()) //
        .get('/movies/999')
        .expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer()) //
        .patch('/movies/1')
        .send({ title: 'Update Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()) //
        .delete('/movies/1')
        .expect(200);
    });
  });
});
