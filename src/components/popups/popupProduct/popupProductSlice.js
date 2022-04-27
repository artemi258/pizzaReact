import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeProduct: [],
    popupActivation: false
};

const popupProduct = createSlice({
    name: 'popupProduct',
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

const { reducer, actions } = popupProduct;

export const {
    addActiveProduct,
    changePopupActivation
} = actions;

export default reducer;
