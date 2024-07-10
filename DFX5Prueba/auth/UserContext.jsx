import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  const setUser = (user) => {
    setUsername(user.username);
  };

  return (
    <UserContext.Provider value={{ username, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
