import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeProduct: [],
    popupActivation: false
};

const desserts = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        addActiveProduct: (state, action) => {
            state.activeProduct = action.payload;
        },
        changePopupActivation: (state, action) => {
            state.popupActivation = action.payload;
        }
    }
});

const { reducer, actions } = desserts;

export const {
    addActiveProduct,
    changePopupActivation
} = actions;

export default reducer;
