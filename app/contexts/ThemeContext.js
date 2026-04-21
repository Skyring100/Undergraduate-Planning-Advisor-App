import React, { createContext, use, useContext, useState } from 'react';

//green, red, blue, pink, purple, yellow, orange, grey
export const extraDark = [ '#022b21', '#2b0202', '#021b2b', '#2b021b', '#180123', '#2b2802', '#2b1702', '#121212' ];
export const mainDark = ['#035642', '#560303', '#033556', '#560336', '#300245', '#565003', '#562D03', '#242424'];
export const secondDark = ['#047158', '#710404', '#044671', '#710447', '#4F0471', '#716A04', '#713B04', '#3B3B3B'];
export const thirdDark = ['#069D7A', '#9D0606', '#06619D', '#9D0663', '#6D069D', '#9D9306', '#9D5206', '#525252'];
export const fourthDark = ['#07CA9C', '#CA0707', '#077CCA', '#CA077F', '#8C07CA', '#CABD07', '#CA6907', '#696969'];

export const lessLight = extraDark;
export const mainLight = mainDark;
export const secondLight = secondDark;
export const thirdLight = thirdDark;
export const fourthLight = fourthDark;

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

export const useThemeText = () => {
    const { isDarkMode } = useThemeStore();
    return {
        color: isDarkMode ? "#fff" : "#000",
    };
}

export const useThemeBackground = () => {
    const { isDarkMode } = useThemeStore();
    return {
        backgroundColor: isDarkMode ? "#292929" : "#fff",
    };
}
export const useThemeShaded = () => {
    const { isDarkMode } = useThemeStore();
    return {
        backgroundColor: isDarkMode ? "#454545" : "#dad9d6",
    };
}
export const useThemeGreyed = () => {
    const { isDarkMode } = useThemeStore();
    return {
        backgroundColor: isDarkMode ? "#737373" : "#8b8b8b",
    };
}
export const useZerothColour = () => {
    const { isDarkMode, indexColour } = useThemeStore();
    return {
        backgroundColor: isDarkMode ? extraDark[indexColour] : lessLight[indexColour],
    };
}
export const useFirstColour = () => {
    const { isDarkMode, indexColour } = useThemeStore();
    return {
        backgroundColor: isDarkMode ? mainDark[indexColour] : mainLight[indexColour],
    };
}
export const useSecondColour = () => {
    const { isDarkMode, indexColour } = useThemeStore();
    return {
        backgroundColor: isDarkMode ? secondDark[indexColour] : secondLight[indexColour],
    };
}
export const useThirdColour = () => {
    const { isDarkMode, indexColour } = useThemeStore();
    return {
        backgroundColor: isDarkMode ? thirdDark[indexColour] : thirdLight[indexColour],
    };
}
export const useFourthColour = () => {
    const { isDarkMode, indexColour } = useThemeStore();
    return {
        backgroundColor: isDarkMode ? fourthDark[indexColour] : fourthLight[indexColour],
    };
}
