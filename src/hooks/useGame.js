import { useEffect } from 'react';

import { useAppStore } from '../store/useAppStore';
import { checkGameState } from '../utils/functions';

export const useGame = () => {
  const { state, actions } = useAppStore();
  const { squares, winner, isPlayerTurn, gameStarted } = state;

  useEffect(() => {
    if (isPlayerTurn && !winner && gameStarted) {
      const interval = setInterval(() => {
        actions.tick();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlayerTurn, winner, gameStarted, actions]);

  useEffect(() => {
    if (!isPlayerTurn && !winner && gameStarted) {
      const botMoveTimeout = setTimeout(() => {
        actions.botMove();
      }, 1000);

      return () => clearTimeout(botMoveTimeout);
    }
  }, [isPlayerTurn, winner, gameStarted, actions]);

  useEffect(() => {
    if (isPlayerTurn && state.timer === 0 && !winner && gameStarted) {
      actions.botMove();
    }
  }, [state.timer, isPlayerTurn, winner, gameStarted, actions]);

  useEffect(() => {
    const result = checkGameState(squares);

    if (result) actions.setEndOfGame(result);
  }, [squares, actions]);

  return {
    state,
    actions: {
      ...actions,
      handleClick: actions.playerMove,
    },
  };
};