import { useContext } from 'react';
import { AppContext } from '../components/context/AppContext';

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
