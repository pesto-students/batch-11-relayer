import express from 'express';
import userController from '../controller/UserController';

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/signin', userController.signIn);
router.post('/authenticate', userController.getAuthenticatedUserDetails);

module.exports = {
  path: '/user',
  router,
};
