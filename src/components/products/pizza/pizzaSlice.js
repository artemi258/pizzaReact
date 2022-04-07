import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/http.hook';

const initialState = {
    pizza: [],
    pizzaLoadingState: 'idle'
};

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizza',
    () => {
        const { request } = useHttp();
        return request('http://localhost:3001/pizza');
    }
);

const pizza = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizza.pending, state => {state.pizzaLoadingState = 'loading'})
            .addCase(fetchPizza.fulfilled, (state, action) => {
                state.pizza = action.payload;
                state.pizzaLoadingState = 'idle';
            })
            .addCase(fetchPizza.rejected, state => {state.pizzaLoadingState = 'error'})
    }
});

const { reducer } = pizza;

export default reducer;
