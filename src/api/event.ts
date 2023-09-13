import { db } from "./db";
import { ITask, ISessionReducer, IUrlSession, IAuthToken } from "types";
import { post } from "./util";

export const createCompletedTask = async (task: ITask, session: ISessionReducer, authToken: IAuthToken) => {
  await post("/api/completeTask", {
    task,
    session,
  }, authToken);
};
