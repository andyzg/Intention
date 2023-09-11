import { createSlice } from '@reduxjs/toolkit';
import { ITask, ISessionReducer, IUrlSession } from 'types';

export const SessionSlice = createSlice({
  name: 'Session',
  initialState: {
    taskId: undefined,
    startTime: undefined,
    urlSession: [],
    activeUrlSession: undefined,
  },

  reducers: {
    startSession: (state: ISessionReducer, action) => {
      state.taskId = action.payload.id;
      state.startTime = Date.now();
    },
    addUrlChange: (state: ISessionReducer, action) => {
      console.log('addUrlChange', action.payload);
      const activeUrlSession = state.activeUrlSession;
      if (activeUrlSession) {
        state.urlSession.push({
          url: activeUrlSession.url,
          startTime: activeUrlSession.startTime,
          endTime: Date.now(),
        });
      }

      state.activeUrlSession = {
        url: action.payload,
        startTime: Date.now(),
      }
    },
  },
});

export const { startSession, addUrlChange } = SessionSlice.actions;

export default SessionSlice.reducer;
