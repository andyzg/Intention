import React, { useEffect } from 'react';
import classes from './toolbar.module.css';
import { ITask } from '../../types';
import * as TaskData from '../../Data/task';

function App() {
  const [pinnedTask, setPinnedTask] = React.useState<ITask | null>(null);

  useEffect(() => {
    (async () => {
      const tasks = await TaskData.getTasks();
      setPinnedTask(tasks[0]);
    })();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>Toolbar: {pinnedTask?.name} </div>
    </div>
  )
}

export default App;
