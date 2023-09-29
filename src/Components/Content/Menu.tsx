import React, { useEffect } from 'react';
import classes from './menu.module.css';
import { ITask, IAppState } from 'types';
import * as TaskData from 'Data/task';

import { useSelector, useDispatch } from 'react-redux';
import { startSession } from "store/reducer/session";
import { completeTask } from "store/reducer/task";

function Menu() {
  const dispatch = useDispatch();
  const session = useSelector((state: IAppState) => state.session);
  const isSessionActive = !!session.taskId ? true : false;

  const tasks = useSelector((state: IAppState ) => state.task.tasks || []);
  const topTask = tasks.length > 0 ? tasks[0] : null;

  const onStart = () => {
    dispatch(startSession(topTask));
  }

  const onComplete = () => {
    dispatch(completeTask(topTask));
  }

  const menuItems = [];
  if (isSessionActive) {
    menuItems.push(
      <div className={classes.menuContainer__item}>
        Done
      </div>
    );
    menuItems.push(
      <div className={classes.menuContainer__item}>
        Pause
      </div>
    );
  } else {
    menuItems.push(
      <div className={classes.menuContainer__item} onClick={onStart}>
        Start
      </div>
    );
  }

  menuItems.push(
    <div className={classes.menuContainer__item}>
      Menu
    </div>
  );

  return (
    <div className={classes.menuContainer}>
      {menuItems}
    </div>
  )
}

export default Menu;

