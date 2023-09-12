import { db } from "@/data/db";


export const completeTask = async (task: any, session: any) => {
  const r1 = await db.from("Task").insert({
    name: task.name,
    created_at: new Date(task.createdAt),
  });

  const r2 = await db.from("Session").insert({
    created_at: new Date(session.startTime),
    ended_at: new Date(session.endTime),
    url_session: JSON.stringify(session.urlSession),
  });

  console.log(r1, r2);
};
