import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    stocks: [],
    stockLoadingState: 'idle'
};



const stocks = createSlice({
    name: 'stocks',
    initialState,
    reducers: {}
});

const { reducer } = stocks;

export default reducer;
