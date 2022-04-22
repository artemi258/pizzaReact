import { configureStore } from '@reduxjs/toolkit';
import stocks from '../components/products/stocks/stocksSlice';
import pizza from '../components/products/pizza/pizzaSlice';
import drinks from '../components/products/drinks/drinksSlice';
import snacks  from '../components/products/snacks/snacksSlice';
import desserts from '../components/products/desserts/dessertsSlice';
import sauces from '../components/products/sauces/saucesSlice';
import search from '../components/search/searchSlice';
import filters from '../components/popupFilters/popupFiltersSlice';
import popupProduct from '../components/popupProduct/popupProductSlice';

const store = configureStore({
    reducer: {stocks, pizza, drinks, snacks, desserts, sauces, search, filters, popupProduct},
    middleware: geetDefaultMiddleware => geetDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
