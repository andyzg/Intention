import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from 'store/reducer/task'
import sessionReducer from 'store/reducer/session'
import authReducer from 'store/reducer/auth'

import taskMiddleware from 'store/middleware/task'
import eventMiddleware from 'store/middleware/event'


export default configureStore({
  reducer: {
    task: taskReducer,
    session: sessionReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([taskMiddleware, eventMiddleware])
})
