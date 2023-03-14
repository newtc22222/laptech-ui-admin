import React, { createContext, useCallback, useState } from 'react';
import { createSessionStorage } from '../helper/CreateStorage';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const activeStorage = createSessionStorage('activeTab');
  const [activeTab, setActiveTab] = useState(
    activeStorage.get('tab') || 'home'
  );

  if (!activeStorage.get('tab')) {
    // !undefined, !null, !"" -> true
    activeStorage.set('tab', activeTab);
  }

  const handleSetActiveTab = useCallback(tab => {
    activeStorage.set('tab', tab);
    setActiveTab(tab);
  }, []);

  return (
    <ThemeContext.Provider value={{ activeTab, handleSetActiveTab }}>
      {children}
    </ThemeContext.Provider>
  );
}
