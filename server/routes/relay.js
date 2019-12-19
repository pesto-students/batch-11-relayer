import express from 'express';
import RelayController from '../controller/RelayController';
import validateAuthentication from "../middlewares/authentication";
const router = express.Router();

router.get('/relays',validateAuthentication,RelayController.getRelays);
router.get('/relays/:relayId', RelayController.getSingleRelay);
router.post('/relays', RelayController.createNewRelay);
router.put('/relays/:relayId', RelayController.updateExistingRelay);
router.delete('/relays/:relayId', RelayController.moveRelayToTrash);

module.exports = {
  path: '/api/v1',
  router,
};
