import { configureStore } from '@reduxjs/toolkit';
import stocks from '../components/products/stocks/stocksSlice';
import pizza from '../components/products/pizza/pizzaSlice';
import drinks from '../components/products/drinks/drinksSlice';
import snacks  from '../components/products/snacks/snacksSlice';
import desserts from '../components/products/desserts/dessertsSlice';
import sauces from '../components/products/sauces/saucesSlice';

const store = configureStore({
    reducer: {stocks, pizza, drinks, snacks, desserts, sauces},
    middleware: geetDefaultMiddleware => geetDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
