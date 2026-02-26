import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [startYear, setStartYear] = useState(0);
  const [startSemester, setSemester] = useState('');
  const [degree, setDegree] = useState('');
  const [currentCourses, setCurrentCourses] = useState([]);
  const [pastCourses, setPastCourses] = useState([]);

  const contextValue = {
    email, setEmail,
    username, setUsername,
    startYear, setStartYear,
    startSemester, setSemester,
    degree, setDegree
  };

  return (
    <UserContext.Provider value={contextValue}>
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
