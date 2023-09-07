export interface ITask {
  id: string;
  name: string;
  priority: number
}

export interface ITaskReducer {
  tasks: ITask[];
}

export interface ISessionReducer {
  task?: ITask;
  startTime?: number;
}

export interface IAppState {
  task: ITaskReducer;
  session: ISessionReducer;
}
