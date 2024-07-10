import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3200/api'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const loadFromLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
      return null;
    }
  };
  

  useEffect(() => {
    const storedUser = loadFromLocalStorage('user');
    const storedAccessToken = loadFromLocalStorage('accessToken');
    const storedRefreshToken = loadFromLocalStorage('refreshToken');

    if (storedUser) setUser(storedUser);
    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${API_URL}/refreshToken`, {
        refreshToken,
      });

      const { newAccessToken } = response.data;

      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, accessToken, refreshToken, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
