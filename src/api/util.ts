const BASE_URL = "";


export const post = async (path: string, payload: any) => {
  await fetch(BASE_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
