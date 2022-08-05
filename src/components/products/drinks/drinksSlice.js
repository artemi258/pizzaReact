import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    drinks: [],
    drinksLoadingState: 'idle'
};

const drinks = createSlice({
    name: 'drinks',
    initialState,
    reducers: {
        addDrinks: (state, action) => {
            state.drinks = action.payload;
        }
    },
});

const { reducer, actions } = drinks;

export const {addDrinks} = actions;


export default reducer;
