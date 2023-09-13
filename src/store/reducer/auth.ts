// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
  name: 'Session',
  initialState: {
    session: undefined
  },

  reducers: {
    onAuthUpdate: (state: any, action) => {
      state.session = action.payload.session;
    },
  },
});

export const { onAuthUpdate } = AuthSlice.actions;

export default AuthSlice.reducer;

