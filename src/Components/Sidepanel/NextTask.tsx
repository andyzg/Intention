import React, { useEffect, useState } from "react";
import { getTopTask } from "../../Data/task";
import { ITask } from "../../types";
import classes from "./nexttask.module.css";

interface NextTaskProps {
}

const NextTask: React.FunctionComponent<NextTaskProps> = (props) => {
  const [topTask, setTopTask] = useState<ITask | null>(null);
  useEffect(() => {
    (async () => {
      const topTask = await getTopTask();
      setTopTask(topTask);
    })();
  }, []);

  return (
    <div className={classes.container + " hey"}>
      Top task: {topTask?.name}
    </div>
  );
};


export default NextTask;
