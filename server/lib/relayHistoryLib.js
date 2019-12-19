import eventEmitter from './eventsLib';
import RelayHistory from '../models/RelayHistory';
import logger from "../utils/logger"

eventEmitter.on('relayHistory:create', async(payload) => {
  const relayHistory = {
    relayId:payload.relayId,
    status:payload.status,
    message: `From:${payload.from} --> To:${payload.to} Action Performed: ${payload.action}`
  }
  try {
    await RelayHistory.create(relayHistory)
  } catch (e) {
    logger.error(e)
  }
});
