import React, { useEffect } from 'react';
import classes from './toolbar.module.css';
import { ITask, IAppState } from 'types';
import * as TaskData from 'Data/task';

import { useSelector } from 'react-redux';

function App() {
  const session = useSelector((state: IAppState) => state.session);
  const sessionState = !!session.taskId ? "active" : "inactive";
  const pinnedTask = useSelector((state: IAppState) => state.task.tasks.find((task: ITask) => task.id === state.session?.taskId));

  console.log(session);
  return (
    <div className={classes.container} data-state={sessionState}>
      <div className={classes.toolbar}>{pinnedTask?.name} </div>
    </div>
  )
}

export default App;
