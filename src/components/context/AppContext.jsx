import React, { useCallback, useState, createContext } from 'react';
import { createSessionStorage } from '../../helper/createStorage';

export const AppContext = createContext();

function AppProvider({ children }) {
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
    <AppContext.Provider value={{ activeTab, handleSetActiveTab }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
