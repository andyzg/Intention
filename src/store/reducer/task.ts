import { createSlice } from '@reduxjs/toolkit';
import { ITask, ITaskReducer } from '../../types';

export const TaskSlice = createSlice({
  name: 'Task',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state: ITaskReducer, action) => {
      state.tasks.push(action.payload);
    },
    setTasks: (state: ITaskReducer, action) => {
      state.tasks = action.payload;
    },
    removeTask: (state: ITaskReducer, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state: ITaskReducer, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
    completeTask: (state: ITaskReducer, action) => {},
    clearActiveTask: (state: ITaskReducer, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const { addTask, removeTask, updateTask, setTasks, completeTask, clearActiveTask } = TaskSlice.actions;

export default TaskSlice.reducer;
