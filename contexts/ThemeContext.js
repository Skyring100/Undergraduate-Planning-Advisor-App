import React, { createContext, use, useContext, useState } from 'react';

//green, red, blue, pink, purple, yellow, orange, grey
export const mainDark = ['#035642', '#560303', '#033556', '#560336', '#300245', '#565003', '#562D03', '#242424'];
export const secondDark = ['#047158', '#710404', '#044671', '#710447', '#4F0471', '#716A04', '#713B04', '#3B3B3B'];
export const thirdDark = ['#069D7A', '#9D0606', '#06619D', '#9D0663', '#6D069D', '#9D9306', '#9D5206', '#525252'];
export const fourthDark = ['#07CA9C', '#CA0707', '#077CCA', '#CA077F', '#8C07CA', '#CABD07', '#CA6907', '#696969'];

export const mainLight = ['#62F9D6', '#F96262', '#62BDF9', '#F962BF', '#CA61FA', '#F9EF62', '#F9AD62', '#808080'];
export const secondLight = ['#8EFBE1', '#FB8E8E', '#8ECFFB', '#FB8ED1', '#D98DFB', '#FBF48E', '#FBC48E', '#969696'];
export const thirdLight = ['#BAFDED', '#FDBABA', '#BAE2FD', '#FDBAE3', '#E8BAFD', '#FDF8BA', '#FDDBBA', '#ADADAD'];
export const fourthLight = ['#E6FEF9', '#FEE6E6', '#E6F5FE', '#FEE6F5', '#F7E6FE', '#FEFDE6', '#FEF2E6', '#C4C4C4'];

export const borderColour = ['#011913', '#110101', '#190101', '#190110', '#110119', '#191701', '#190D01', '#0D0D0D'];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [indexColour, setIndex] = useState(0);

  const contextValue = {
    isDarkMode,
    setIsDarkMode,
    indexColour,
    setIndex,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
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