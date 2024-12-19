import { configureStore } from '@reduxjs/toolkit';

import authSlice from '@app/redux/authSlice';
import cartSlice from '@app/redux/cartSlice';
import categorySlice from '@app/redux/categorySlice';
import filterSlice from '@app/redux/filterSlice';
import uiSlice from '@app/redux/uiSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    filter: filterSlice,
    category: categorySlice,
    cart: cartSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
