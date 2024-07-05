import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import { API_URL } from '../../auth/constants';

export default function SignUp() {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const auth = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
   
try {
  const response = await fetch(`${API_URL}/signup`,{
  method:"POST",
  headers :{
    "Content-Type": "application/json"
  },
  body:JSON.stringify({

Username,
Email,
Password

  })

})


} catch (error) {
  
}

  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="login-button">
          Create User
        </button>
      </form>
    </div>
  );
}
