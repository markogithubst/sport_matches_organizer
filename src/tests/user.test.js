const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { postUserData } = require('./test-data/postUserData');
const { runSeed } = require('../seed/seed');
const { runUnseed } = require('../seed/unseed');

describe('Test /user routes', () => {
  beforeAll(async () => {
    await runSeed();
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`);
  });

  afterAll(async () => {
    await runUnseed();
    mongoose.connection.close();
  });

  describe('Test GET requests for /user route', () => {
    test('GET on /user route returns 200 status code', async () => {
      const { body, headers, statusCode } = await request(app).get('/user');

      expect(body).toEqual(expect.any(Object));
      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(200);
    });
    test('GET on user/63eb6abf9792291234cd6a77 returns appropriate data types', async () => {
      const { body, headers } = await request(app).get('/user/63eb6abf9792291234cd6a77');

      expect(headers['content-type']).toMatch(/json/);
      expect(body).toEqual(
        {
          success: expect.any(Boolean),
          data: expect.objectContaining(
            {
              _id: expect.any(String),
              username: expect.any(String),
              name: expect.any(String),
              surname: expect.any(String),
              email: expect.any(String),
              phone: expect.any(String),
              role: expect.any(String)
            })
        });
    });
  });

  describe('Test GET requests for /user/63eb6abf9792291234cd6a77/history route', () => {
    test('Should return 200 status for a logged in user with valid credentials', async () => {
      const login = await request(app).post('/login').send({ email: 'iburazin@gmail.com', password: 'password' });
      const token = login.headers.authorization;
      const response = await request(app)
        .get('/user/63eb6abf9792291234cd6a77/history').set('Authorization', `${token}`);

      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test POST on /user route', () => {
    describe.each(postUserData)('POST on /user route returns appropriate status code and data format',
      (user, expectedStatus) => {
        test(`POST request returns ${expectedStatus} status code`, async () => {
          const { statusCode, headers, body } = await request(app).post('/user')
            .send(user);
          expect(headers['content-type']).toMatch(/json/);
          expect(body).toEqual(expect.any(Object));
          expect(statusCode).toBe(expectedStatus);
        });
      });
  });

  describe('Test DELETE request for /user route with invalid and valid ID', () => {
    describe.each([
      ['23eb6abf9792291234cd6a77', 404],
      ['63eb6abf9792291234cd6a77', 200],
      ['a', 400],
      [0, 400]
    ])('DELETE on /user route returns expected status code', (id, expectedStatus) => {
      test(`DELETE request returns ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send({ email: 'admin@gmail.com', password: 'password' });
        const token = login.headers.authorization;
        const { statusCode } = await request(app)
          .delete(`/user/${id}`).set('Authorization', `${token}`);

        expect(statusCode).toBe(expectedStatus);
      });
    });
  });
});
