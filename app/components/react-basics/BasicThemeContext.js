"use client";
import { createContext, useState, useContext } from 'react';

// 1. Create Context
const BasicThemeContext = createContext(null);

// 2. Create Provider
export function BasicThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <BasicThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </BasicThemeContext.Provider>
    );
}

// 3. Custom Hook (optional but best practice)
export function useBasicTheme() {
    return useContext(BasicThemeContext);
}
