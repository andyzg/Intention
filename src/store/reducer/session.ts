import { createSlice } from '@reduxjs/toolkit';
import { ITask, ISessionReducer } from 'types';

export const SessionSlice = createSlice({
  name: 'Session',
  initialState: {
    task: undefined,
    startTime: undefined,
  },
  reducers: {
    startSession: (state: ISessionReducer, action) => {
      state.task = action.payload;
      state.startTime = Date.now();
    },
  },
});

export const { startSession } = SessionSlice.actions;

export default SessionSlice.reducer;
