import { createSlice} from '@reduxjs/toolkit';
import products from '../../../JSON/product.json';

const initialState = {
    filters: products.Filters,
    resultFilteringPizza: [],
    resultFilteringDrinks: [],
    resultFilteringSnacks: [],
    resultFilteringDesserts: [],
    resultFilteringSauces: [],
    countFilters: null,
    filtersVisibility: false,
    filtersLoadingState: 'idle'
};

const filters = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filteringPizza: (state, action) => {
            state.resultFilteringPizza = action.payload;
        },
        filteringDrinks: (state, action) => {
            state.resultFilteringDrinks = action.payload;
        },
        filteringSnacks: (state, action) => {
            state.resultFilteringSnacks = action.payload;
        },
        filteringDesserts: (state, action) => {
            state.resultFilteringDesserts = action.payload;
        },
        filteringSauces: (state, action) => {
            state.resultFilteringSauces = action.payload;
        },
        countFilters: (state, action) => {
            state.countFilters = action.payload;
        },
        changeFiltersVisibility: (state, action) => {
            state.filtersVisibility = action.payload;
        }
    }
});

const { reducer, actions } = filters;

export const {
    filteringPizza,
    filteringDrinks,
    filteringSnacks,
    filteringDesserts,
    filteringSauces,
    countFilters,
    changeFiltersVisibility
} = actions;

export default reducer;
