import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear contexto para la autenticación
const AuthContext = createContext();

// Componente proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Función para leer y parsear datos de localStorage de forma segura
  const loadFromLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
      return null;
    }
  };

  // useEffect para cargar datos de localStorage al montar el componente
  useEffect(() => {
    const storedUser = loadFromLocalStorage('user');
    const storedAccessToken = loadFromLocalStorage('accessToken');
    const storedRefreshToken = loadFromLocalStorage('refreshToken');

    // Verifica si los valores son válidos antes de asignarlos
    if (storedUser) setUser(storedUser);
    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
  }, []);

  // Función de login para actualizar el estado y localStorage
  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  // Función de logout para limpiar el estado y localStorage
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, accessToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}
