import React from 'react';
import { useState } from "react";
import { useAuth } from '../../auth/AuthProvider';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [Username,setUsername]= useState ("");
  const [Password,setPassword]= useState ("");
  const auth = useAuth();

  if (auth.isAuthenticated){
    return <Navigate to = "/dashboard" />
  }

  
  return (


    
    <div className="login-container">
      <form className="login-form">
        <h1>Login</h1>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={Username} onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button className="login-button">Login</button>
      </form>
    </div>
  );
}
