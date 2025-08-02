import { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

import { AppContext } from './AppContext'

const initialState = {
  player: null,
  bot: null,
}

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState);

  const updateState = useCallback((key, value) => setState((prevState) => ({
      ...prevState,
      [key]: value,
    })), [setState]);
  

  const setPlayer = useCallback((player) => updateState('player', player), [updateState]);
  const setBot = useCallback((bot) => updateState('bot', bot), [updateState]);


  const value = useMemo(() => ({
    state,
    setPlayer,
    setBot,
  }), [state, setPlayer, setBot]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};