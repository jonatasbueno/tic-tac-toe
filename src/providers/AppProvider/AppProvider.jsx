import { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

import { AppContext } from './AppContext'

const initialState = {
  squares: Array(9).fill(null),
  winner: null,
  winningLine: [],
  timer: 5,
  message: '',
  playerColor: 'blue-500',
  botColor: 'black',
  playerWins: 0,
  botWins: 0,
  gameStarted: false,
}

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState);

  const updateState = useCallback((key, value) => setState((prevState) => ({
      ...prevState,
      [key]: value,
    })), [setState]);

  const setSquares = useCallback((squares) => updateState('squares', squares), [updateState]);
  const setWinner = useCallback((winner) => updateState('winner', winner), [updateState]);
  const setWinningLine = useCallback((winningLine) => updateState('winningLine', winningLine), [updateState]);
  const setTimer = useCallback((timer) => updateState('timer', timer), [updateState]);
  const setMessage = useCallback((message) => updateState('message', message), [updateState]);
  const setPlayerColor = useCallback((playerColor) => updateState('playerColor', playerColor), [updateState]);
  const setPlayerWins = useCallback((playerWins) => updateState('playerWins', playerWins), [updateState]);
  const setBotWins = useCallback((botWins) => updateState('botWins', botWins), [updateState]);
  const setGameStarted = useCallback((gameStarted) => updateState('gameStarted', gameStarted), [updateState]);

  const value = useMemo(() => ({
    state,
    setSquares,
    setWinner,
    setWinningLine,
    setTimer,
    setMessage,
    setPlayerColor,
    setPlayerWins,
    setBotWins,
    setGameStarted,
  }), [state, setSquares, setWinner, setWinningLine, setTimer, setMessage, setPlayerColor, setPlayerWins, setBotWins, setGameStarted]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};