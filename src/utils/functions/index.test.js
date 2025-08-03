import { describe, it, expect } from 'vitest';

import { checkGameState, getBotMove } from './index';

describe('checkGameState', () => {
  it('should return "X" and winning line if X wins horizontally', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(checkGameState(board)).toEqual({ winner: 'X', winningLine: [0, 1, 2] });
  });

  it('should return "O" and winning line if O wins vertically', () => {
    const board = [null, 'O', null, null, 'O', null, null, 'O', null];
    expect(checkGameState(board)).toEqual({ winner: 'O', winningLine: [1, 4, 7] });
  });

  it('should return "X" and winning line if X wins diagonally', () => {
    const board = ['X', null, null, null, 'X', null, null, null, 'X'];
    expect(checkGameState(board)).toEqual({ winner: 'X', winningLine: [0, 4, 8] });
  });

  it('should return "tie" if the board is full and no winner', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(checkGameState(board)).toEqual({ winner: 'tie', winningLine: [] });
  });

  it('should return null if the game is still ongoing', () => {
    const board = ['X', null, 'O', null, 'X', null, 'O', null, null];
    expect(checkGameState(board)).toBeNull();
  });
});

describe('getBotMove', () => {
  it('should return a valid move for the bot', () => {
    const board = [null, null, null, null, null, null, null, null, null];
    const move = getBotMove(board, 'O');
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThanOrEqual(8);
  });

  it('should block player from winning', () => {
    const board = ['X', 'X', null, null, null, null, null, null, null];
    const move = getBotMove(board, 'O');
    expect(move).toBe(2);
  });

  it('should win if possible', () => {
    const board = ['O', 'O', null, null, null, null, null, null, null];
    const move = getBotMove(board, 'O');
    expect(move).toBe(2);
  });

  it('should return a move that leads to a tie if no win/loss is possible', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', null];
    const move = getBotMove(board, 'O');
    expect(move).toBe(8);
  });
});
