import React, { useEffect } from 'react';
import classes from './toolbar.module.css';
import { ITask, IAppState } from 'types';
import * as TaskData from 'Data/task';

import Menu from 'Components/Content/Menu';

import { useSelector } from 'react-redux';
import { startSession } from "store/reducer/session";
import { completeTask } from "store/reducer/task";

function App() {
  const session = useSelector((state: IAppState) => state.session);
  const sessionState = !!session.taskId ? "active" : "inactive";
  const pinnedTask = useSelector((state: IAppState) => state.task.tasks.find((task: ITask) => task.id === state.session?.taskId));

  console.log("Toolbar: ", session, pinnedTask);

  return (
    <div className={classes.container} data-state={sessionState}>
      {pinnedTask ? (
        <div className={classes.toolbar}>{pinnedTask?.name} </div>
      ) : null}
      <div className={classes.menuContainer}>
        <Menu />
      </div>
    </div>
  )
}

export default App;
