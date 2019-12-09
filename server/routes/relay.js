import express from 'express';
import RelayController from '../controller/RelayController';

const router = express.Router();

router.get('/relays', RelayController.getRelays);
// router.put('/change/status', RelayController.toggleRelayStatus);

module.exports = {
  path: '/',
  router,
};
