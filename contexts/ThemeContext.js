import React, { createContext, useContext, useState } from 'react';

//green, red, blue, pink, purple, yellow, orange
export const mainDark = ['#035642', '#560303', '#033556', '#560336', '#560336', '#565003', '#562D03'];
export const secondDark = ['#047158', '#710404', '#044671', '#710447', '#4F0471', '#716A04', '#713B04'];
export const thirdDark = ['#069D7A', '#9D0606', '#06619D', '#9D0663', '#6D069D', '#9D9306', '#9D5206'];
export const fourthDark = ['#07CA9C', '#CA0707', '#077CCA', '#CA077F', '#8C07CA', '#CABD07', '#CA6907'];

export const mainLight = ['#09F6BF', '#F60909', '#0997F6', '#F6099B', '#AB09F6', '#F6E609', '#F68009'];
export const secondLight = ['#35F8CA', '#F83535', '#35AAF8', '#F835AD', '#BA35F8', '#F8EB35', '#F89635'];
export const thirdLight = ['#62F9D6', '#F96262', '#62BDF9', '#F962BF', '#C962F9', '#F9EF62', '#F9AD62'];
export const fourthLight = ['#8EFBE1', '#FB8E8E', '#8ECFFB', '#FB8ED1', '#D88EFB', '#FBF48E', '#FBC48E'];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState({
    isDarkMode: false,
    indexColour: 0,
  });


  return (
    <ThemeContext.Provider value={{ theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeStore = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeStore must be used within ThemeProvider');
  }
  return context;
};