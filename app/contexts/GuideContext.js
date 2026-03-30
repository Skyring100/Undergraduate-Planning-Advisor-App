import React, { createContext, use, useContext, useState } from 'react';

const guideContext = createContext();
//I think I'll do it in a way that I get the current screen
const AppProvider = ({ children }) => {
  const [guide, setGuide] = useState('');

  return (
    <AppContext.Provider value={{ guide, setGuide }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
