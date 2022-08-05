import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    sauces: [],
    saucesLoadingState: 'idle'
};

const sauces = createSlice({
    name: 'sauces',
    initialState,
    reducers: {
        addSauces: (state, action) => {
            state.sauces = action.payload;
        }
    }
});

const { reducer, actions } = sauces;

export const {addSauces} = actions;

export default reducer;
