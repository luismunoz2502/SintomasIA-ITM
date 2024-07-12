import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import SignUp from './Routes/signup.jsx';
import Dashboard from './Routes/dashboard.jsx';
import Login from './Routes/Login.jsx';
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import { AuthProvider } from '../auth/AuthProvider.jsx';

import Welcome from './Routes/Welcome'


const router = createBrowserRouter([
  {
              
  


    path: '/',
    element: <App />,
    children: [
      {
        path: '/login', 
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/welcome',
        element: <Welcome />,
      },
      
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard', 
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
ReactDOM.createRoot(document.getElementById('root')).render(<Root />);