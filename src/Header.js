import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import { UserContext } from "./UserContext.js";
import DarkBtn from "./DarkBtn.js";
import React from 'react';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {

 const {setUserInfo,userInfo}=useContext(UserContext);
  useEffect(() => {

    fetch("http://localhost:8000/profile", {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
       setUserInfo(userInfo);
      });
    });
  }, []);
 function logout(){
    fetch('https://blog-app-six-blush.vercel.app/logout',{
        credentials: 'include',
        method:"POST",

    });
    setUserInfo(null);
    toast.success(("logged out!"));
 }

 const username=userInfo?.username;


  return (
    <header>
      
      <Link to="/" className="logo">My Blog </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <DarkBtn/>
      </nav>
    </header>
  );
}
