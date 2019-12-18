import express from 'express';
import userController from '../controller/UserController';
import validateAuthentication from "../middlewares/authentication";
const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/signin', userController.signIn);
router.get('/authenticate', validateAuthentication,userController.getAuthenticatedUserDetails);

module.exports = {
  path: '/user',
  router,
};
