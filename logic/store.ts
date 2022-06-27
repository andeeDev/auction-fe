import { combineReducers, configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { shopApi } from './services/fetchProducts';
import auth from '../logic/authSlice';
import cart from '../logic/orderSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [shopApi.reducerPath],
};

const isNotPersistedReducers = {
    [shopApi.reducerPath]: shopApi.reducer,
};
const reducers = {
    // Add the generated reducer as a specific top-level slice
    ...isNotPersistedReducers,
    auth,
    cart,
};
const combinedReducers = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
    reducer: persistedReducer, //persistedReducer, //persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(shopApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;