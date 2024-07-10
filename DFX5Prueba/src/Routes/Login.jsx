import React, { useState } from 'react';
import axios from 'axios'; 
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../auth/constants';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      const { user, accessToken, refreshToken } = response.data;
      auth.login(user, accessToken, refreshToken);

      navigate('/welcome');
    } catch (error) {
      setError(error.response?.data?.error || 'Ocurrió un error');
      console.error('Error en la solicitud:', error.message);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-button">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
