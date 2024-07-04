import { useState } from "react";

export default function SignUp () 
{ const [Username,setUsername]= useState ("");
  const [Email,setEmail]= useState ("");
  const [Password,setPassword]= useState ("");

  
  
  return(
    <div className="login-container">
      <form className="login-form">
        <h1>SingUp</h1>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={Username} onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" value={Email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        
        <button className="login-button">Create user</button>
      </form>
    </div>
  );;
    
}