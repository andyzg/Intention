import { Middleware } from 'redux';

import { INIT_APP } from 'store/actions';
import { setTasks } from 'store/reducer/task';
import { getTasks } from "Data/task";

const middleware: Middleware = (store) => (next) => (action) => {
  if (action.type === INIT_APP) {
    (async () => {
      const tasks = await getTasks();
      store.dispatch(setTasks(tasks));
    })();
  }

  next(action);
};

export default middleware;
