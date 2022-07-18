import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { shopApi } from './services/services';
import auth from '../logic/authSlice';
import cart from '../logic/orderSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';


const persistConfig = {
    key: 'root',
    storage,
    blacklist: [shopApi.reducerPath],
};

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            console.warn('We got a rejected action!');
            //toast.warn({ title: 'Async error!', message: action.error.data.message });
            //toast(`Some troubles occurred, try again later!`);
        }

        return next(action);
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
        getDefaultMiddleware({ serializableCheck: false }).concat(shopApi.middleware, rtkQueryErrorLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;