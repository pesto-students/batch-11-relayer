import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

describe('Apps test', () => {
  let authToken;
  beforeAll((done) => {
    request(app)
      .post('/user/signup')
      .set('Content-Type', 'application/json')
      .send({ email: 'parthiban.rakesh95@gmail.com', password: '12345678' })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        authToken = res.body.body.authToken;
        done();
      });
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });

  test('should get a list of all apps', (done) => {
    request(app)
      .get('/api/v1/apps')
      .set('Cookie', `authToken=${authToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.length).not.toBe(0);
        done();
      });
  });

  test('should get the details of an event', (done) => {
    const eventName = 'New Message Posted to Channel';
    request(app)
      .get(`/api/v1/apps/Slack/?eventName=${eventName}`)
      .set('Cookie', `authToken=${authToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.body.EventName).toBe(eventName);
        done();
      });
  });
});
