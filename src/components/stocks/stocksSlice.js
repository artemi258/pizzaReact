import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';


const initialState = {
    stocks: [],
    stockLoadingState: 'idle'
};

export const fetchStocks = createAsyncThunk(
    'stocks/fetchStocks',
    () => {
        const { request } = useHttp();
        return request('./product.json');
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
                state.stocks = state.stocks.concat(action.payload);
                state.stockLoadingState = 'idle';
            })
            .addCase(fetchStocks.rejected, state => {state.stockLoadingState = 'error'})
    }
});

const { reducer } = stocks;

export default reducer;
