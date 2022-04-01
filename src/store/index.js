import { configureStore } from '@reduxjs/toolkit';
import stocks from '../components/products/stocks/stocksSlice';
import pizza from '../components/products/pizza/pizzaSlice';

const store = configureStore({
    reducer: {stocks, pizza},
    middleware: geetDefaultMiddleware => geetDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
