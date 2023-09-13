export interface ITask {
  id: string;
  name: string;
  priority: number;
  createdAt: number;
}

export interface ITaskReducer {
  tasks: ITask[];
}

export interface ISessionReducer {
  taskId?: string;
  startTime?: number;
  endTime?: number;
  urlSession: IUrlSession[];
  activeUrlSession?: IUrlSession;
}

export interface IUrlSession {
  url: string;
  startTime: number;
  endTime?: number;
}

export interface IAppState {
  task: ITaskReducer;
  session: ISessionReducer;
  auth: any;
}

export interface ICompletedTask {
  task: ITask;
  session: ISessionReducer[];
}

export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
}
