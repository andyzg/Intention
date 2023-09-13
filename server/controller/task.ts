import { db } from "@/data/db";


export const completeTask = async (task: any, session: any) => {
  const taskData = {
    name: task.name,
    created_at: new Date(task.createdAt),
  }
  console.log("Task data: ", taskData);
  const { data, error } = await db.from("Task").insert(taskData).select();

  console.log("Data: ", data, typeof data, error);

  const r2 = await db.from("Session").insert({
    created_at: new Date(session.startTime),
    ended_at: new Date(),
    url_session: JSON.stringify(session.urlSession),
  });

  console.log(r2);
};
