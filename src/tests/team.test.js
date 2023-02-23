const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { runSeed } = require('../seed/seed');
const { runUnseed } = require('../seed/unseed');
const { HTTP_STATUS } = require('../utils/httpCodes.js');

describe('Field', () => {
  beforeAll(async () => {
    await runSeed();
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`);
  });

  afterAll(async () => {
    await runUnseed();
    await mongoose.connection.close();
  });
  describe('GET', () => {
    test('when id is valid, should respond with 200 and an object containing success and data attributes', async () => {
      const { body, headers, statusCode } = await request(app).get('/team/63eb7aa9dda73e59e84aa443');

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.OK);
      expect(body)
        .toEqual({
          success: expect.any(Boolean),
          data: expect.objectContaining({
            _id: expect.any(String),
            players: expect.any(Array),
            color: expect.any(String)
          })
        });
    });
    test('when the id doesnt exist should respond with 404', async () => {
      const { headers, statusCode } = await request(app).get('/team/63eb76f1c6a12337f1bbb59f');

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.NOT_FOUND);
    });
    test('when the is isnt valid should respond with 400', async () => {
      const { headers, statusCode } = await request(app).get('/team/123123');

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.INVALID);
    });
    test('should respond with 200 and an object which has a success and data attribute that is an array', async () => {
      const { body, headers, statusCode } = await request(app).get('/team');

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.OK);
      expect(body).toEqual(expect.any(Object));
      expect(body).toEqual({
        success: expect.any(Boolean),
        data: expect.any(Array)
      });
      expect(body.data[0].players.length).toBe(3);
    });
  });
});
