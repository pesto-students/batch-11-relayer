import express from 'express';
import userController from '../controller/UserController';

const router = express.Router();


router.get('/', (req, res) => {
  res.send('User');
});
router.post('/signup', userController.createUser);
router.post('/signin', userController.signIn);
router.post('/authenticate', userController.getAuthenticatedUserDetails);

module.exports = {
  path: '/api/v1/user',
  router,
};
