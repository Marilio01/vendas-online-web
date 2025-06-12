import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import globalReducer from './reducers/globalReducer';
import orderReducer from './reducers/orderReducer';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  categoryReducer,
  globalReducer,
  orderReducer,
  productReducer,
  userReducer,
  cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer', 'userReducer'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;