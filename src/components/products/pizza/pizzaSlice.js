import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    pizza: [],
    pizzaLoadingState: 'idle',
    animation: false
};

const pizza = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        changeAnimation: state => {
            state.animation = true;
        },
        addPizza: (state, action) => {
            state.pizza = action.payload;
        }
    }
});

const { reducer, actions } = pizza;

export const {changeAnimation, addPizza} = actions;

export default reducer;
