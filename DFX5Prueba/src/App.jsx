import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  const imageUrl = 'https://appian.com/adobe/dynamicmedia/deliver/dm-aid--e21c4555-e474-4ef6-bbb2-293bfb50eca0/logo-dfx5.png?preferwebp=true&width=1200&quality=85';

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <img src={imageUrl} alt="Logo DFX5" />
        </div>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">SignUp</Link></li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
        <div className="welcome-message">
          <h2>Bienvenido a su aplicación</h2>
          <p>Disfrute de todas las funcionalidades que ofrecemos.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
