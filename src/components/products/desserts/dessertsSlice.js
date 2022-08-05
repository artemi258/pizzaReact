import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    desserts: [],
    dessertsLoadingState: 'idle'
};

const desserts = createSlice({
    name: 'desserts',
    initialState,
    reducers: {
        addDesserts: (state, action) => {
            state.desserts = action.payload;
        }
    }
});

const { reducer, actions } = desserts;

export const {addDesserts} = actions;

export default reducer;
