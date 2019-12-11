import express from 'express';
import RelayController from '../controller/RelayController';

const router = express.Router();

router.get('/relays', RelayController.getRelays);
router.get('/relays/:relayId', RelayController.getSingleRelay);
// router.put('/change/status', RelayController.toggleRelayStatus);

module.exports = {
  path: '/api/v1',
  router,
};
