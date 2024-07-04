import React from 'react';


export default function Login() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Login</h1>
        <div className="form-group">
          <label>Username</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" />
        </div>
        <button className="login-button">Login</button>
      </form>
    </div>
  );
}
