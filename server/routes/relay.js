import express from 'express';
import relayController from '../controller/RelayController';

const router = express.Router();

router.get('/myrelays', relayController.getMyRelays);
router.put('/change/status', relayController.toggleRelayStatus);

module.exports = {
  path: '/',
  router,
};
