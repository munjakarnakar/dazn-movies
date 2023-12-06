import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  it('/movies (POST) - Add movie', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        name: `Animal ${Math.random()}`,
        genre: 'Action',
        rating: 5,
        streamingLink: 'https://www.movies.com/animal',
      })
      .expect(200)
  });

  // it('/movies (POST) - Add movie - 400', () => {
  //   return request(app.getHttpServer())
  //     .post('/movies')
  //     .send({
  //       name: 'Animal',
  //       genre: 'Action',
  //       rating: "5",
  //       streamingLink: 'https://www.movies.com/animal',
  //     })
  //     .expect(400)
  // });


  it('/movies (GET) - List movies', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
    // .expect({
    //   data: [
    //     {
    //       name: 'Animal',
    //       genre: 'Action',
    //       rating: 5,
    //       streamingLink: 'https://www.movies.com/animal',
    //     }
    //   ],
    // });
  });

  it('/movies?q={string} (Get) - List movies with search', () => {
    return request(app.getHttpServer())
      .get('/movies?q=das')
      .expect(200)
    //.expect({ message: 'Successfully added' });
  });

  it('/movies/:id (Put) - Update movie', () => {
    return request(app.getHttpServer())
      .put('/movies/65702b617c0b40d776056c86')
      .send({
        "genre": "DRAMA"
      })
      .expect(200)
    //.expect({ message: 'Successfully added' });
  });

  it('/movies (Delete) - Delete movie', () => {
    return request(app.getHttpServer())
      .delete('/movies/65702b617c0b40d776056c86')
      .expect(200)
    //.expect({ message: 'Successfully added' });
  });

});
