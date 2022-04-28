import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/http.hook';

const initialState = {
    stocks: [],
    stockLoadingState: 'idle'
};

export const fetchStocks = createAsyncThunk(
    'stocks/fetchStocks',
    () => {
        const { request } = useHttp();
        return request('http://localhost:3001/stocks');
    }
);

const stocks = createSlice({
    name: 'stocks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocks.pending, state => {state.stockLoadingState = 'loading'})
            .addCase(fetchStocks.fulfilled, (state, action) => {
                state.stocks = action.payload;
                state.stockLoadingState = 'idle';
            })
            .addCase(fetchStocks.rejected, state => {state.stockLoadingState = 'error'})
    }
});

const { reducer } = stocks;

export default reducer;
