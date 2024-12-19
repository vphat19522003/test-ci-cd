import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserTypeResponse } from '@app/types/user';
import { getUserFromCache, removeUserFromCache, saveUserToCache } from '@app/utils/persistCache/auth';

type initialStateType = {
  user: UserTypeResponse | null;
};

const initialState: initialStateType = {
  user: getUserFromCache()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserTypeResponse }>) => {
      state.user = action.payload.user;
      saveUserToCache(action.payload.user, 3600 * 1000);
    },
    clearUser: (state) => {
      state.user = null;
      removeUserFromCache();
    }
  }
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
