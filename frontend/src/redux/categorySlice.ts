import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CustomCategoryResponseType } from '@app/types/category';

export type initialCategoryStateType = {
  mainCategory: CustomCategoryResponseType[];
};

const initialState: initialCategoryStateType = {
  mainCategory: []
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<CustomCategoryResponseType[]>) {
      state.mainCategory = action.payload;
    }
  }
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
