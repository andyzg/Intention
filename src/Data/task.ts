import { ITask } from '../types';

export const getTasks = async (): Promise<ITask[]> => {
  const data: { [key: string]: ITask[] } = await chrome.storage.local.get(['tasks']);
  return Object.values(data.tasks).sort((a: ITask, b: ITask) => a.priority - b.priority);
};

export const getTopTask = async (): Promise<ITask | null> => {
  const tasks: ITask[] = await getTasks();
  console.log('tasks', tasks);
  if (tasks.length === 0) {
    return null;
  }

  return tasks[0];
}
