import eventEmitter from "./eventsLib";
import RelayHistory from "../models/RelayHistory";

eventEmitter.on('create:relayHistory',(payload)=>{
    RelayHistory.create(payload);
})
