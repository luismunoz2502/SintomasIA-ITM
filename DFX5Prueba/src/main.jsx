import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import SignUp from './Routes/signup.jsx';
import Login from './Routes/Login.jsx';
import { AuthProvider } from '../auth/AuthProvider.jsx';
import Welcome from './Routes/Welcome';
import PrivateRoute from './PrivateRoute.jsx';
import { Home } from './Routes/Home.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/', 
        element: <Home />,
      },
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
        element: <PrivateRoute element={<Welcome />} />, // Protege la ruta
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);