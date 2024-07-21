import { Outlet, Link, useLocation } from 'react-router-dom';
import { buttonsLinks } from '../config';
import './App.css';

function App() {
  const location = useLocation();
  const showNav = location.pathname !== '/welcome';

  return (
    <div className="app">
      {showNav && (
        <header className="header">
          <ul className='buttonsElements'>
            {
              buttonsLinks.map((button) => (
                <li key={button.id} className={location.pathname === button.route ? 'active' : ''}>
                  <Link to={button.route}>
                    <i className={button.icon}></i>
                    <span>{button.name}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </header>
      )}
      <main className="mainContent">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
