import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    filters: [],
    resultFilteringPizza: [],
    resultFilteringDrinks: [],
    resultFilteringSnacks: [],
    resultFilteringDesserts: [],
    resultFilteringSauces: [],
    countFilters: null,
    filtersVisibility: false,
    filtersLoadingState: 'idle'
};

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request } = useHttp();
        return request('http://localhost:3001/Filters');
    }
);

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingState = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
                state.filtersLoadingState = 'idle';
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingState = 'error'})
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
