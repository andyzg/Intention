import React, { useEffect, useState } from "react";
import { getTopTask } from "../../Data/task";
import { ITask } from "../../types";
import classes from "./nexttask.module.css";

import { IAppState } from "../../types";
import { useSelector } from "react-redux";

interface NextTaskProps {
}

const NextTask: React.FunctionComponent<NextTaskProps> = (props) => {
  const tasks = useSelector((state: IAppState ) => state.task.tasks || []);
  const topTask = tasks.length > 0 ? tasks[0] : null;

  return (
    <div className={classes.container}>
      Top task: {topTask?.name}
    </div>
  );
};


export default NextTask;
