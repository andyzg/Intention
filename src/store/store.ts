import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './reducer/task'
import taskMiddleware from './middleware/task'


export default configureStore({
  reducer: {
    task: taskReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(taskMiddleware)
})
