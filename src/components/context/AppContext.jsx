import React, {
  useCallback,
  useState,
  createContext,
  useContext,
  useEffect
} from 'react';
import { createSessionStorage } from '../../utils/createStorage';
import { useLocation } from 'react-router-dom';

export const AppContext = createContext(null);

function AppProvider({ children }) {
  const location = useLocation();
  const activeStorage = createSessionStorage('activeTab');

  const [activeTab, setActiveTab] = useState({
    tab: activeStorage.get('tab') || 'home',
    subTab: activeStorage.get('subTab') || ''
  });

  const handleSetActiveTab = useCallback((tab, subTab) => {
    const parentTab = !!tab ? tab : 'home';
    activeStorage.set('tab', parentTab);
    activeStorage.set('subTab', subTab);
    setActiveTab({ tab: parentTab, subTab });
  }, []);

  useEffect(() => {
    const tabs = location.pathname.split('/'); // => ["", tab, sub-tab]
    handleSetActiveTab(tabs[1], tabs[2]);
  }, [location.pathname]);

  return (
    <AppContext.Provider value={{ activeTab, handleSetActiveTab }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
export default AppProvider;
