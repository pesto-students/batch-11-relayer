import express from 'express';
import userController from '../controller/UserController';

const router = express.Router();


router.get('/', (req, res) => {
  res.send('User');
});
router.post('/signup', userController.createUser);
router.post('/signin', userController.signIn);
module.exports = {
  path: '/user',
  router,
};
