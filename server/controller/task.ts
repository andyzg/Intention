import { db } from "@/data/db";


export const completeTask = async (task: any, session: any) => {
  const taskData = {
    name: task.name,
    created_at: new Date(task.createdAt),
  }
  console.log("Task data: ", taskData);
  const { data, error } = await db.from("Task").insert(taskData).select();

  if (data) {
    const newTask = data[0];
    const activeUrlSession = session.activeUrlSession;
    activeUrlSession.endTime = Date.now();
    const urlSessions = session.urlSession.concat([activeUrlSession]);
    console.log("URL SESSIONS: ", JSON.stringify(urlSessions, null, 2));

    const r2 = await db.from("Session").insert({
      created_at: new Date(session.startTime),
      ended_at: new Date(),
      url_session: JSON.stringify(urlSessions),
      task_id: newTask.id,
    });

    console.log(r2);
  } else {
    console.log("Error: ", error);
  }
};
