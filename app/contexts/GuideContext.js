import React, { createContext, use, useContext, useState } from 'react';

const guideContext = createContext();

export function guideProvider() {
    const [screen, setScreen] = useState('');
    const [index, setIndex] = useState(0);

    const contextValue = {
        screen,
        setScreen,
        index,
        setIndex,
    };

    return (
        <ThemeContext.Provider>
            {children}
        </ThemeContext.Provider>
    );
}

export const AgendaGuide = () =>{
    
}