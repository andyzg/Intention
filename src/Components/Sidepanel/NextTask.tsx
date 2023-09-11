import React, { useEffect, useState } from "react";
import { getTopTask } from "../../Data/task";
import { ITask } from "../../types";
import classes from "./nexttask.module.css";
import { useDispatch } from "react-redux";

import { IAppState } from "types";
import { useSelector } from "react-redux";
import { startSession } from "store/reducer/session";
import { completeTask } from "store/reducer/task";

interface NextTaskProps {
}

const NextTask: React.FunctionComponent<NextTaskProps> = (props) => {
  const tasks = useSelector((state: IAppState ) => state.task.tasks || []);
  const topTask = tasks.length > 0 ? tasks[0] : null;
  const dispatch = useDispatch();

  const onStart = () => {
    dispatch(startSession(topTask));
  };

  const onDone = () => {
    dispatch(completeTask(topTask));
  };

  return (
    <div className={classes.container}>
      Top task: {topTask?.name}
      <button onClick={onStart}> Start </button>
      <button onClick={onDone}> Done </button>
    </div>
  );
};


export default NextTask;
