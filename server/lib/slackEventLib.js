import mongoose from 'mongoose';
import eventEmitter from './eventsLib';
const authorizedApp = mongoose.model('AuthorizedApps')
eventEmitter.on('Github:Authorize:Init', (payload) => {
    
});
