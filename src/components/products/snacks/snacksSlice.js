import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/http.hook';

const initialState = {
    snacks: [],
    snacksLoadingState: 'idle'
};

export const fetchSnacks = createAsyncThunk(
    'snacks/fetchSnacks',
    () => {
        const { request } = useHttp();
        return request('http://localhost:3001/snacks');
    }
);

const snacks = createSlice({
    name: 'snacks',
    initialState,
    reducers: {
        addSnacks: (state, action) => {
            state.snacks = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSnacks.pending, state => {state.snacksLoadingState = 'loading'})
            .addCase(fetchSnacks.fulfilled, (state, action) => {
                state.snacks = action.payload;
                state.snacksLoadingState = 'idle';
            })
            .addCase(fetchSnacks.rejected, state => {state.snacksLoadingState = 'error'})
    }
});

const { reducer, actions } = snacks;

export const {addSnacks} = actions;

export default reducer;
