import eventEmitter from './eventsLib';
import RelayHistory from '../models/RelayHistory';

eventEmitter.on('relayHistory:create', (payload) => {
  const relayHistory = {
    relayId:payload.relayId,
    status:payload.status,
    message: `From:${payload.from} --> To:${payload.to} Action Performed: ${payload.action}`
  }
  RelayHistory.create(relayHistory)
});
