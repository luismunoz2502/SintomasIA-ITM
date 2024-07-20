import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import { IMAGE_URL } from '../config';

function App() {
  const location = useLocation();
  if (location.pathname === '/') {
    return <Navigate to="/login" />;
  }
  const showNavbar = location.pathname !== '/welcome';
  return (
    <div className="App">
      {showNavbar && (
        <nav className="navbar">
          <div className="logo">
            <img src={IMAGE_URL} alt="Logo DFX5" />
          </div>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">SignUp</Link></li>
          </ul>
        </nav>
      )}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
