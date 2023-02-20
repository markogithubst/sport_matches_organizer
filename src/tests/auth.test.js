const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Testing all auth validations', () => {
  beforeAll(async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Testing login route', () => {
    describe.each([
      [{ email: 'iburazin@gmail.com', password: 'password' }, 200],
      [{ email: 'iburazin@example.com', password: 'password' }, 404],
      [{ email: 'iburazin@gmail.com', password: 'test124' }, 400]
    ])('Testing login route with valid and invalid credentials', (userBody, expectedStatus) => {
      test(`Should respond with a ${expectedStatus} status code`, async () => {
        const { headers, statusCode } = await request(app).post('/login').send(userBody);

        expect(headers['content-type']).toMatch(/json/);
        expect(statusCode).toBe(expectedStatus);
      });
    });
  });
});
