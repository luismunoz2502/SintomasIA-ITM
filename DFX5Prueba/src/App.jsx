import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import './App.css';

function App() {
  // URL de la imagen proporcionada
  const imageUrl = 'https://appian.com/adobe/dynamicmedia/deliver/dm-aid--e21c4555-e474-4ef6-bbb2-293bfb50eca0/logo-dfx5.png?preferwebp=true&width=1200&quality=85';

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <img src={imageUrl} alt="Logo DFX5" />
        </div>
        <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          
        </ul>
      </nav>
      <Outlet />
      <div className="welcome-message">
        <h1>Bienvenido a su aplicación</h1>
        <p>Disfrute de todas las funcionalidades que ofrecemos.</p>
      </div>
    </div>
  );
}

export default App;
