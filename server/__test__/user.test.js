const request = require('supertest');
const app = require('../app.js');

describe('User Test', () => {
  describe('User Signup', () => {
    it('should create a user', (done) => {
      request(app)
        .post('/user/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ email: 'sourav@pesto.tech', password: '12345678' })
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.error).toBe(false);
          expect(res.body.authToken).toBeTruthy();
          expect(res.body.password).toBeNull();
          done();
        });
    });
    it('should throw error when sign up with same email', (done) => {
      request(app)
        .post('/user/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ email: 'sourav@pesto.tech', password: '12345678' })
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.statusCode).toBe(200);
          expect(res.body.error).toBe(true);
          expect(res.body.password).toBeNull();
          done();
        });
    });
    it('should throw error if password is not provided', (done) => {
      request(app)
        .post('/user/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ email: 'sourav@pesto.tech' })
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.error).toBe(true);
          expect(res.statusCode).toBe(200);
          expect(res.body.password).toBeNull();
          done();
        });
    });
  });
});
