import { auth } from "Data/db";
import { IAuthToken } from "types";

const BASE_URL = "http://localhost:3000";


export const post = async (path: string, payload: any, authPayload: IAuthToken) => {
  await fetch(BASE_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authPayload.accessToken}`,
      Refresh: authPayload.refreshToken,
    },
    body: JSON.stringify(payload),
  });
};
