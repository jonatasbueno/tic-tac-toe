import { useContext } from 'react';
import { AppContext } from '../providers/AppProvider/AppContext';

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
