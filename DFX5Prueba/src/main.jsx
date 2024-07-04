import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './Routes/signup.jsx';
import Dashboard from './Routes/dashboard.jsx';
import Login from './Routes/Login.jsx';
import ProtectedRoute from './Routes/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/',
        element: <ProtectedRoute />,
        children : [
          {
            path:"/dashboard",
            element:<Dashboard/>
          }


        ]


      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
