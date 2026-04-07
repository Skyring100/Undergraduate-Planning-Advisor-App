import {createContext, useState, useContext} from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    return (
        <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => useContext(DrawerContext);