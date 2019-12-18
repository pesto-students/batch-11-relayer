import mongoose from 'mongoose';

const request = require('supertest');
const app = require('../app.js');
const actionStatus = require('../constants/actionStatus');

describe('User Test', () => {
  describe('User Signup', () => {
    afterAll(async (done) => {
      await mongoose.disconnect();
      done();
    });

    it('should create a user', (done) => {
      request(app)
        .post('/user/signup')
        .set('Content-Type', 'application/json')
        .send({ email: 'sourav@pesto.tech', password: '12345678' })
        .expect(200)
        .end((err, res) => {
          const { error, status, body } = res.body;
          expect(err).toBeFalsy();
          expect(error).toBe(false);
          expect(status).toBe(actionStatus.SUCCESS);
          expect(body.authToken).toBeTruthy();
          expect(body.password).toBeFalsy();
          done();
        });
    });
    it('should throw error when sign up with same email', (done) => {
      request(app)
        .post('/user/signup')
        .set('Content-Type', 'application/json')
        .send({ email: 'sourav@pesto.tech', password: '12345678' })
        .expect(200)
        .end((err, res) => {
          const {
            error, status, body,
          } = res.body;
          expect(err).toBeFalsy();
          expect(res.statusCode).toBe(200);
          expect(status).toBe(actionStatus.NOT_ALLOWED);
          expect(error).toBe(true);
          expect(body.password).toBeFalsy();
          done();
        });
    });
    it('should throw error if password is not provided', (done) => {
      request(app)
        .post('/user/signup')
        .set('Content-Type', 'application/json')
        .send({ email: 'sourav@pesto.tech' })
        .expect(200)
        .end((err, res) => {
          expect(err).toBeFalsy();
          expect(res.body.error).toBe(true);
          expect(res.statusCode).toBe(200);
          expect(res.body.password).toBeFalsy();
          done();
        });
    });
  });
    describe('User Login', ()=> {
        it('should login with valid credentials', function () {
            request(app)
                .post('/user/signin')
                .set('Content-Type', 'application/json')
                .send({ email: 'sourav@pesto.tech',password:'password'})
                .expect(200)
                .expect((err,res)=>{
                    expect(err).toBeFalsy()
                    expect(res.body.error).toBe(false);
                    expect(res.statusCode).toBe(200);
                    expect(res.body.password).toBeFalsy();
                    expect(res.body).toBeTruthy();
                })
        });
        it('should fail with invalid credentials', function () {
            request(app)
                .get('/user/signin')
                .set('Content-Type', 'application/json')
                .send({ email: 'sourav@pesto.tech',password:'12345678'})
                .expect(200)
                .expect((err,res)=>{
                    expect(err).toBeFalsy()
                    expect(res.body.error).toBe(true);
                    expect(res.statusCode).toBe(200);
                })
        });
    });
});
