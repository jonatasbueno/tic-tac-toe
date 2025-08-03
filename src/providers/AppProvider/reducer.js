import { getBotMove } from '../../utils/functions';

export const actionTypes = {
  START_GAME: 'START_GAME',
  PLAYER_MOVE: 'PLAYER_MOVE',
  BOT_MOVE: 'BOT_MOVE',
  SET_END_OF_GAME: 'SET_END_OF_GAME',
  RESET_GAME: 'RESET_GAME',
  CHANGE_PLAYER_NAME: 'CHANGE_PLAYER_NAME',
  CHANGE_PLAYER_COLOR: 'CHANGE_PLAYER_COLOR',
  TICK: 'TICK',
};

export const initialState = {
  squares: Array(9).fill(null),
  winner: null,
  winningLine: [],
  isPlayerTurn: true,
  gameStarted: false,
  message: '',
  timer: 5,
  playerWins: 0,
  botWins: 0,
  playerName: 'Jogador',
  playerColor: 'text-blue-500',
  botColor: 'red-500',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_GAME:
      return {
        ...initialState,
        playerName: state.playerName,
        playerColor: state.playerColor,
        playerWins: state.playerWins,
        botWins: state.botWins,
        gameStarted: true,
        isPlayerTurn: true,
        message: `É a vez de ${state.playerName}`,
      };

    case actionTypes.PLAYER_MOVE: {
      if (state.squares[action.payload] || state.winner) {
        return state;
      }
      const newSquares = [...state.squares];
      newSquares[action.payload] = 'X';
      return {
        ...state,
        squares: newSquares,
        isPlayerTurn: false,
        message: 'É a vez do Bot',
        timer: 5,
      };
    }

    case actionTypes.BOT_MOVE: {
      const botMove = getBotMove(state.squares);
      const newSquares = [...state.squares];
      newSquares[botMove] = 'O';
      return {
        ...state,
        squares: newSquares,
        isPlayerTurn: true,
        message: `É a vez de ${state.playerName}`,
        timer: 5,
      };
    }

    case actionTypes.SET_END_OF_GAME: {
      const { winner, winningLine } = action.payload;
      let message = '';
      let playerWins = state.playerWins;
      let botWins = state.botWins;

      if (winner === 'X') {
        message = `${state.playerName} venceu!`;
        playerWins += 1;
      } else if (winner === 'O') {
        message = 'Bot venceu!';
        botWins += 1;
      } else {
        message = 'Empate!';
      }

      return {
        ...state,
        winner,
        winningLine,
        message,
        playerWins,
        botWins,
        gameStarted: false,
      };
    }

    case actionTypes.TICK: {
      if (state.timer > 0) {
        return { ...state, timer: state.timer - 1 };
      }
      return state;
    }

    case actionTypes.RESET_GAME:
      return {
        ...initialState,
        playerWins: state.playerWins,
        botWins: state.botWins,
        playerName: state.playerName,
        playerColor: state.playerColor,
      };

    case actionTypes.CHANGE_PLAYER_NAME:
      return { ...state, playerName: action.payload };

    case actionTypes.CHANGE_PLAYER_COLOR:
      return { ...state, playerColor: action.payload };

    default:
      return state;
  }
}
