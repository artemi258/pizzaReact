import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    filters: [],
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
    reducers: {},
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

const { reducer } = filters;

export default reducer;
