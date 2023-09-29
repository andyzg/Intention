// @ts-nocheck
import { db } from "@/data/db";
const regex = new RegExp("^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+)");

const processSession = (session: any) => {
  const urlSessions = JSON.parse(session.url_session);
  const time = {}

  for (const sessionData of urlSessions) {
    const { url, startTime, endTime } = sessionData;
    const domains = url.match(regex);
    if (!domains) {
      console.log("no domain: ", url);
      continue;
    }

    const domain = domains[0]
    const duration = endTime - startTime;

    if (!(domain in time)) {
      time[domain as string] = duration
    } else {
      time[domain as string] += duration
    }
  }

  console.log(time);
};

(async () => {
  const data = await db.from("Session").select().eq("id", 40)
  const session = data.data[0];
  console.log(data);
  processSession(session);
  process.exit(0);
})();
