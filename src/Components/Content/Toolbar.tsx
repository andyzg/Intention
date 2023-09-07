import React, { useEffect } from 'react';
import classes from './toolbar.module.css';
import { ITask, IAppState } from 'types';
import * as TaskData from 'Data/task';

import { useSelector } from 'react-redux';

function App() {
  const [pinnedTask, setPinnedTask] = React.useState<ITask | null>(null);
  const session = useSelector((state: IAppState) => state.session);

  console.log(session);
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
