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
  urlSession: IUrlSession[];
  activeUrlSession?: IUrlSession;
}

export interface IUrlSession {
  url: string;
  startTime: number;
  duration?: number;
}

export interface IAppState {
  task: ITaskReducer;
  session: ISessionReducer;
}
