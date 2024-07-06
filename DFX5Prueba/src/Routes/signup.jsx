import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import { API_URL } from '../../auth/constants';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const auth = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Todos los campos son obligatorios');
      }
  
      const data = await response.json();
      console.log('User created:', data);
  
    
  
    } catch (error) {
      setError(error.message);
      console.error('Error en la solicitud:', error.message);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="signup-button">Create User</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
