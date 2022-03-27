import { configureStore } from '@reduxjs/toolkit';
import stocks from '../components/stocks/stocksSlice';

const store = configureStore({
    reducer: {stocks},
    middleware: geetDefaultMiddleware => geetDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
