import { useContext } from "react";

import { AppContext } from '../providers/AppProvider/AppContext';

export function useAppStore() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }

  return context;
}