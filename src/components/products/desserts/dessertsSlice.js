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
         request('../../../JSON/product.json')
    }
);

const desserts = createSlice({
    name: 'desserts',
    initialState,
    reducers: {
        addDesserts: (state, action) => {
            state.desserts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDesserts.pending, state => {state.dessertsLoadingState = 'loading'})
            .addCase(fetchDesserts.fulfilled, (state, action) => {
                state.desserts = action.payload.desserts;
                state.dessertsLoadingState = 'idle';
            })
            .addCase(fetchDesserts.rejected, state => {state.dessertsLoadingState = 'error'})
    }
});

const { reducer, actions } = desserts;

export const {addDesserts} = actions;

export default reducer;
