import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.js";
import React from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo}=useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("https://blogapp-1-3glq.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.status === 200) {
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
        setRedirect(true);
      })
      toast.success(("logged in!"));
    } else {
      // alert("wrong credentials");
      toast.error("Wrong credentials!")
    }
  }
  if (redirect) {

     return <>
     <Navigate to={"/"} />;
     </>
  
  }
  return (
    <form action="" className="login" onSubmit={login}  >
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
    
      {/* <button onClick={notify} >login</button> */}
        <button>Login</button>
    </form>
  );
}
