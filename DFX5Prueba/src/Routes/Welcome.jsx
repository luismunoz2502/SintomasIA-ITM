import React from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

export default function Welcome() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  const imageUrl = 'https://appian.com/adobe/dynamicmedia/deliver/dm-aid--e21c4555-e474-4ef6-bbb2-293bfb50eca0/logo-dfx5.png?preferwebp=true&width=1200&quality=85';

  const user = auth.user || {};

  return (
    <div className="welcome-container2">
      <nav className="navbar2">
        <div className="logo">
          <img src={imageUrl} alt="Logo DFX5" />
        </div>
        <div className="user-info">
          <span>Bienvenido {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <h3>Luis, ❤️</h3>
    </div>
  );
}
