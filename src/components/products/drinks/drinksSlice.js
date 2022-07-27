import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/http.hook';

const initialState = {
    drinks: [],
    drinksLoadingState: 'idle'
};

// export const fetchDrinks = createAsyncThunk(
//     'drinks/fetchDrinks',
//     () => {
//         const { request } = useHttp();
//         return request('http://localhost:3001/drinks');
//     }
// );

const drinks = createSlice({
    name: 'drinks',
    initialState,
    reducers: {
        addDrinks: (state, action) => {
            state.drinks = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchDrinks.pending, state => {state.drinksLoadingState = 'loading'})
    //         .addCase(fetchDrinks.fulfilled, (state, action) => {
    //             state.drinks = action.payload;
    //             state.drinksLoadingState = 'idle';
    //         })
    //         .addCase(fetchDrinks.rejected, state => {state.drinksLoadingState = 'error'})
    // }
});

const { reducer, actions } = drinks;

export const {addDrinks} = actions;


export default reducer;
