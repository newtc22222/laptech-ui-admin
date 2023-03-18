import React, { createContext, useCallback, useState } from 'react';
import { createSessionStorage } from '../helper/CreateStorage';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const activeStorage = createSessionStorage('activeTab');
  const [activeTab, setActiveTab] = useState({
    tab: activeStorage.get('tab') || 'home',
    subTab: activeStorage.get('subTab') || ''
  });

  if (!activeStorage.get('tab')) {
    // !undefined, !null, !"" -> true
    activeStorage.set('tab', activeTab.tab);
    activeStorage.set('subTab', activeTab.subTab);
  }

  const handleSetActiveTab = useCallback((tab, subTab) => {
    activeStorage.set('tab', tab);
    activeStorage.set('subTab', subTab);
    setActiveTab({ ...activeTab, tab, subTab });
  }, []);

  return (
    <ThemeContext.Provider value={{ activeTab, handleSetActiveTab }}>
      {children}
    </ThemeContext.Provider>
  );
}
