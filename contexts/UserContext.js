import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {

  const [user, setUser] = useState({
    email: '',
    username: '',
    startDate: '',
    degree: '',
  });

  return (
    <UserContext.Provider value={{ user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserStore = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUesrStore must be used within UserProvider');
  }
  return context;
};
