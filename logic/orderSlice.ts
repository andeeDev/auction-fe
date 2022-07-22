import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CartItem, IProduct } from '../utils/interfaces';

const slice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    } as {
        cart: CartItem[]
    },
    reducers: {
        deleteFromCart: (
            state,
            { payload: product }:
                PayloadAction<IProduct>,
        ) => {
            state.cart = state.cart.filter((orderProduct: CartItem) => orderProduct.product.id !== product.id);
        },
        increaseProductCount: (
            state,
            { payload: product }:
                PayloadAction<IProduct>,
        ) => {
            state.cart = state.cart.map((orderProduct: CartItem) => {
                return orderProduct.product.id === product.id ?
                    { ...orderProduct, amount: orderProduct.amount + 1 } : orderProduct;
            });
        },
        decreaseProductCount: (
            state,
            { payload: product }:
                PayloadAction<IProduct>,
        ) => {
            state.cart = state.cart.map((orderProduct: CartItem) => {
                return orderProduct.product.id === product.id ?
                    { ...orderProduct, amount: orderProduct.amount - 1 } : orderProduct;
            }).filter((orderProduct: CartItem) => orderProduct.amount !== 0);
        },
        addProduct: (
            state,
            { payload: product }:
                PayloadAction<IProduct>,
        ) => {
            if (!state.cart.some((orderProduct: CartItem) => orderProduct.product.id === product.id)) {
                state.cart.push({ product, amount: 1 });
            }
        },
        clearCart(state) {
            state.cart = [];
        },
    },
});

export const { addProduct, decreaseProductCount, increaseProductCount, deleteFromCart, clearCart } = slice.actions;

export default slice.reducer;

export const selectCart = (state: RootState) => state.cart.cart;
