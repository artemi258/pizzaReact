import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    snacks: [],
    snacksLoadingState: 'idle'
};

const snacks = createSlice({
    name: 'snacks',
    initialState,
    reducers: {
        addSnacks: (state, action) => {
            state.snacks = action.payload;
        }
    }
});

const { reducer, actions } = snacks;

export const {addSnacks} = actions;

export default reducer;
