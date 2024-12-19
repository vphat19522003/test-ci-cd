import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICart } from '@app/types/cart';

type initialStateType = {
  cart: ICart | null;
  totalQuantity: number;
  totalPrice: number;
};

const initialState: initialStateType = {
  cart: null,
  totalQuantity: 0,
  totalPrice: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<{ cart: ICart | null; totalQuantity: number }>) => {
      state.cart = action.payload.cart;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice =
        state.cart?.cartItems.reduce((acc, cur) => acc + cur.productId.productPrice * cur.quantity, 0) || 0;
    },
    clearCart: (state) => {
      state.cart = null;
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  }
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
