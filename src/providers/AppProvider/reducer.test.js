import { describe, it, expect, vi } from 'vitest';

import { reducer, initialState, actionTypes } from './reducer';

vi.mock('../../utils/functions', () => ({
  getBotMove: vi.fn((squares) => {
    const emptySquares = squares.map((s, i) => (s === null ? i : null)).filter(s => s !== null);
    return emptySquares[0];
  }),
  checkGameState: vi.fn(() => null),
}));

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle START_GAME', () => {
    const state = { ...initialState, playerName: 'TestPlayer', playerColor: 'red-500' };
    const newState = reducer(state, { type: actionTypes.START_GAME });
    expect(newState.gameStarted).toBe(true);
    expect(newState.message).toBe(`É a vez de TestPlayer`);
  });

  it('should handle PLAYER_MOVE', () => {
    const newState = reducer(initialState, { type: actionTypes.PLAYER_MOVE, payload: 0 });
    expect(newState.squares[0]).toBe('X');
    expect(newState.isPlayerTurn).toBe(false);
    expect(newState.message).toBe('É a vez do Bot');
    expect(newState.timer).toBe(5);
  });

  it('should not allow PLAYER_MOVE on an occupied square', () => {
    const state = { ...initialState, squares: ['X', null, null, null, null, null, null, null, null] };
    const newState = reducer(state, { type: actionTypes.PLAYER_MOVE, payload: 0 });
    expect(newState).toEqual(state);
  });

  it('should handle BOT_MOVE', () => {
    const state = { ...initialState, isPlayerTurn: false };
    const newState = reducer(state, { type: actionTypes.BOT_MOVE });
    expect(newState.squares[0]).toBe('O');
    expect(newState.isPlayerTurn).toBe(true);
    expect(newState.message).toBe(`É a vez de ${initialState.playerName}`);
    expect(newState.timer).toBe(5);
  });

  it('should handle SET_END_OF_GAME - player wins', () => {
    const state = { ...initialState, playerName: 'TestPlayer' };
    const newState = reducer(state, { type: actionTypes.SET_END_OF_GAME, payload: { winner: 'X', winningLine: [0, 1, 2] } });
    expect(newState.winner).toBe('X');
    expect(newState.message).toBe(`TestPlayer venceu!`);
    expect(newState.playerWins).toBe(1);
    expect(newState.gameStarted).toBe(false);
  });

  it('should handle SET_END_OF_GAME - bot wins', () => {
    const newState = reducer(initialState, { type: actionTypes.SET_END_OF_GAME, payload: { winner: 'O', winningLine: [0, 1, 2] } });
    expect(newState.winner).toBe('O');
    expect(newState.message).toBe('Bot venceu!');
    expect(newState.botWins).toBe(1);
    expect(newState.gameStarted).toBe(false);
  });

  it('should handle SET_END_OF_GAME - tie', () => {
    const newState = reducer(initialState, { type: actionTypes.SET_END_OF_GAME, payload: { winner: 'tie', winningLine: [] } });
    expect(newState.winner).toBe('tie');
    expect(newState.message).toBe('Empate!');
    expect(newState.gameStarted).toBe(false);
  });

  it('should handle TICK', () => {
    const state = { ...initialState, timer: 5 };
    const newState = reducer(state, { type: actionTypes.TICK });
    expect(newState.timer).toBe(4);
  });

  it('should handle RESET_GAME', () => {
    const state = { ...initialState, playerWins: 5, botWins: 3, playerName: 'TestPlayer' };
    const newState = reducer(state, { type: actionTypes.RESET_GAME });
    expect(newState).toEqual({ ...initialState, playerWins: 5, botWins: 3, playerName: 'TestPlayer' });
  });

  it('should handle CHANGE_PLAYER_NAME', () => {
    const newState = reducer(initialState, { type: actionTypes.CHANGE_PLAYER_NAME, payload: 'NewName' });
    expect(newState.playerName).toBe('NewName');
  });

  it('should handle CHANGE_PLAYER_COLOR', () => {
    const newState = reducer(initialState, { type: actionTypes.CHANGE_PLAYER_COLOR, payload: 'green-500' });
    expect(newState.playerColor).toBe('green-500');
  });
});
