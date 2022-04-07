import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/http.hook';

const initialState = {
    desserts: [],
    dessertsLoadingState: 'idle'
};

export const fetchDesserts = createAsyncThunk(
    'desserts/fetchDesserts',
    () => {
        const { request } = useHttp();
        return request('http://localhost:3001/desserts');
    }
);

const desserts = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDesserts.pending, state => {state.dessertsLoadingState = 'loading'})
            .addCase(fetchDesserts.fulfilled, (state, action) => {
                state.desserts = action.payload;
                state.dessertsLoadingState = 'idle';
            })
            .addCase(fetchDesserts.rejected, state => {state.dessertsLoadingState = 'error'})
    }
});

const { reducer } = desserts;

export default reducer;
