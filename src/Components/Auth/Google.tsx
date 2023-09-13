import React, { useEffect } from "react";
import { auth } from "Data/db";

export const GoogleAuth = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onLoginClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(await auth.getUser());
    console.log("LOGIN!");
    const { data, error } = await auth.signUp({
      email,
      password
    })
    console.log("DATA: ", data, error);
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
