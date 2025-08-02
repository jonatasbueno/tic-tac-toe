import { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from './AppContext';
import { reducer, initialState, actionTypes } from './reducer';

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => ({
    startGame: () => dispatch({ type: actionTypes.START_GAME }),
    resetGame: () => dispatch({ type: actionTypes.RESET_GAME }),
    playerMove: (index) => dispatch({ type: actionTypes.PLAYER_MOVE, payload: index }),
    botMove: () => dispatch({ type: actionTypes.BOT_MOVE }),
    setEndOfGame: (result) => dispatch({ type: actionTypes.SET_END_OF_GAME, payload: result }),
    tick: () => dispatch({ type: actionTypes.TICK }),
    changePlayerName: (name) => dispatch({ type: actionTypes.CHANGE_PLAYER_NAME, payload: name }),
    changePlayerColor: (color) => dispatch({ type: actionTypes.CHANGE_PLAYER_COLOR, payload: color }),
  }), []);

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
