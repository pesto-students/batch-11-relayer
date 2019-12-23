import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Auth } from './auth';
import Relays from './relays';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};
const authPersistConfig = {
  key: 'auth',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, Auth),
  relays: Relays,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const ConfigureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
  const persistor = persistStore(store);
  return { store, persistor };
};
