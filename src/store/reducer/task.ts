import { createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../types';

interface IState {
  tasks: ITask[];
}

export const TaskSlice = createSlice({
  name: 'Task',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state: IState, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state: IState, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state: IState, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
  },
});

export const { addTask, removeTask, updateTask } = TaskSlice.actions;

export default TaskSlice.reducer;
