import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resultPizza: [],
    resultDrinks: [],
    resultSnacks: [],
    resultDesserts: [],
    resultSauces: []
};

const search = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchPizza: (state, action) => {
            state.resultPizza = action.payload
        },
        searchDrinks: (state, action) => {
            state.resultDrinks = action.payload
        },
        searchSnacks: (state, action) => {
            state.resultSnacks = action.payload
        },
        searchDesserts: (state, action) => {
            state.resultDesserts = action.payload
        },
        searchSauces: (state, action) => {
            state.resultSauces = action.payload
        }
    }
});

const {reducer, actions} = search;

export const {searchPizza, searchDrinks, searchSnacks, searchDesserts, searchSauces} = actions;

export default reducer;