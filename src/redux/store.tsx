import { configureStore } from '@reduxjs/toolkit';
import { LoaderSlice } from './LoaderSlice';
import authReducer from './auth';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        loaders: LoaderSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
