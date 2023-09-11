import { db } from "./db";
import { ITask, ISessionReducer, IUrlSession } from "types";
import { post } from "./util";

export const createCompletedTask = async (task: ITask, session: ISessionReducer) => {
  await post("/api/completedTask", {
    task,
    session,
  });
};
