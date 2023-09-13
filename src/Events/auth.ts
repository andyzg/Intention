export const onAuthEvent = (payload: any) => {
  console.log("Sending auth event");
  chrome.runtime.sendMessage({ type: 'auth', payload: payload });
}
