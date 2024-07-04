import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import SignUp from './Routes/signup.jsx';
import Dashboard from './Routes/dashboard.jsx';
import Login from './Routes/Login.jsx';
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import { AuthProvider } from '../auth/AuthProvider.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login', // Corregido: agregado prefijo '/'
        element: <Login />,
      },
      {
        path: '/signup', // Corregido: agregado prefijo '/'
        element: <SignUp />,
      },
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard', // Corregido: agregado prefijo '/'
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
