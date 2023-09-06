export interface ITask {
  id: string;
  name: string;
  priority: number
}

export interface ITaskReducer {
  tasks: ITask[];
}

export interface IAppState {
  task: ITaskReducer;
}
