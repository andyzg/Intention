import { createListenerMiddleware } from '@reduxjs/toolkit';
import { completeTask } from 'store/reducer/task';
import { IAppState } from 'types';
import { createCompletedTask } from 'api/event';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: completeTask,
  effect: (action, listenerApi) => {
    console.log("Complete task", listenerApi.getState());
    const { task: taskReducer, session } = listenerApi.getState() as IAppState;
    const task = taskReducer.tasks.find((t) => t.id === session.taskId);
    (async () => {
      console.log("Completing task: ", task);
      if (task) {
        await createCompletedTask(task, session);
      }
    })();

    // Store the session and the task
    // Then clear the session and remove the task
  }
});

export default listenerMiddleware.middleware;
