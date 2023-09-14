import { createSlice } from '@reduxjs/toolkit';
import { ITask, ISessionReducer, IUrlSession } from 'types';
import { clearActiveTask } from "store/reducer/task";

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
      if (!state.taskId) {
        return;
      }

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
  extraReducers: (builder) => {
    builder.addCase(clearActiveTask, (state, action) => {
      console.log("CLEAR ACTIVE TASK", action.payload);
      state.taskId = undefined;
      state.startTime = undefined;
      state.urlSession = [];
      state.activeUrlSession = undefined;
    }).addDefaultCase((state, action) => {
      console.log("Default case");
    })
  }
});

export const { startSession, addUrlChange } = SessionSlice.actions;

export default SessionSlice.reducer;
