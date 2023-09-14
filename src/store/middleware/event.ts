import { createListenerMiddleware } from '@reduxjs/toolkit';
import { completeTask, clearActiveTask } from 'store/reducer/task';
import { IAppState } from 'types';
import { createCompletedTask } from 'api/event';
import { auth } from "Data/db";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: completeTask,
  effect: (action, listenerApi) => {
    const { task: taskReducer, session, auth: authReducer } = listenerApi.getState() as IAppState;
    const task = taskReducer.tasks.find((t) => t.id === session.taskId);
    (async () => {
      console.log("AUTH: ", authReducer);

      if (task) {
        await createCompletedTask(task, session, {
          accessToken: authReducer.session.access_token,
          refreshToken: authReducer.session.refresh_token
        });

        listenerApi.dispatch(clearActiveTask(task));
      }
    })();

    // Store the session and the task
    // Then clear the session and remove the task
  }
});

export default listenerMiddleware.middleware;
