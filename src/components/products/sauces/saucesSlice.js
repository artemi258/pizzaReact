import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/http.hook';

const initialState = {
    sauces: [],
    saucesLoadingState: 'idle'
};

export const fetchSauces = createAsyncThunk(
    'sauces/fetchSauces',
    () => {
        const { request } = useHttp();
        return request('http://localhost:3001/sauces');
    }
);

const sauces = createSlice({
    name: 'sauces',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSauces.pending, state => {state.saucesLoadingState = 'loading'})
            .addCase(fetchSauces.fulfilled, (state, action) => {
                state.sauces = action.payload;
                state.saucesLoadingState = 'idle';
            })
            .addCase(fetchSauces.rejected, state => {state.saucesLoadingState = 'error'})
    }
});

const { reducer } = sauces;

export default reducer;
