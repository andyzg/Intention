import { createListenerMiddleware } from '@reduxjs/toolkit';
import { completeTask } from 'store/reducer/task';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: completeTask,
  effect: (action, listenerApi) => {
    console.log("Complete task", listenerApi.getState());
    // Store the session and the task
    // Then clear the session and remove the task
  }
});

export default listenerMiddleware.middleware;
