import React, { useEffect, useState } from "react";
import { auth } from "Data/db";

export const GoogleAuth = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    auth.onAuthStateChange((event, session) => {
      console.log("On auth state change", event, session);
      if (session?.user) {
        setShow(false);
      } else {
        setShow(true);
      }
    });
  }, []);

  const onLoginClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(await auth.getUser());
    console.log("LOGIN!");
    const { data, error } = await auth.signInWithPassword({
      email,
      password
    })
    console.log("DATA: ", data, error);
  }


  if (!show) {
    return null;
  }

  return (
    <form>
      <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password}  onChange={e => setPassword(e.target.value)} />
      <button onClick={onLoginClick}> Login </button>
    </form>
  );
};

export default GoogleAuth;
