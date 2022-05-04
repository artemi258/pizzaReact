import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    countProducts: 0,
    products: [],
    popupActivation: false
};

const popupBasket = createSlice({
    name: 'popupBasket',
    initialState,
    reducers: {
        addTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        changePopupActivation: (state, action) => {
            state.popupActivation = action.payload;
        },
        addProduct: (state, action) => {
            let bool = [];
            const arr = state.products.map(elem => {
                if (elem.id === action.payload[0].id) {
                    bool.push(true);
                    return {...elem, quantity: action.payload[0].quantity === 0 ? '' : action.payload[0].quantity}
                }
                bool.push(false);
                return elem;
            });
            if (bool.includes(true)) {
                state.products = arr;
            } else {
                state.products = arr.concat(action.payload)
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(prod => prod.id !== action.payload);
        }
    }
});

const { reducer, actions } = popupBasket;

export const {
    addTotalPrice,
    changePopupActivation,
    addProduct,
    deleteProduct
} = actions;

export default reducer;
