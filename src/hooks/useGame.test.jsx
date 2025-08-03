import { renderHook, act } from '@testing-library/react';
import { vi, describe, expect, beforeEach, afterEach, it } from 'vitest';

import { useGame } from './useGame';
import { AppContext } from '../providers/AppProvider/AppContext';
import { initialState } from '../providers/AppProvider/reducer';

describe('useGame', () => {
  const mockActions = {
    tick: vi.fn(),
    botMove: vi.fn(),
    setEndOfGame: vi.fn(),
    playerMove: vi.fn(),
  };

  const wrapper = ({ children }) => (
    <AppContext.Provider value={{ state: initialState, actions: mockActions }}>
      {children}
    </AppContext.Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should return initial state and actions', () => {
    const { result } = renderHook(() => useGame(), { wrapper });
    expect(result.current.state).toEqual(initialState);
    expect(result.current.actions.handleClick).toBe(mockActions.playerMove);
  });

  it("should call tick every second when it's player's turn and game started", () => {
    const customState = { ...initialState, isPlayerTurn: true, gameStarted: true };
    const customWrapper = ({ children }) => (
      <AppContext.Provider value={{ state: customState, actions: mockActions }}>
        {children}
      </AppContext.Provider>
    );
    renderHook(() => useGame(), { wrapper: customWrapper });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockActions.tick).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockActions.tick).toHaveBeenCalledTimes(2);
  });

  it("should call botMove after 1 second when it's bot's turn and game started", () => {
    const customState = { ...initialState, isPlayerTurn: false, gameStarted: true };
    const customWrapper = ({ children }) => (
      <AppContext.Provider value={{ state: customState, actions: mockActions }}>
        {children}
      </AppContext.Provider>
    );
    renderHook(() => useGame(), { wrapper: customWrapper });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockActions.botMove).toHaveBeenCalledTimes(1);
  });

  it('should call botMove when player timer reaches 0', () => {
    const customState = { ...initialState, isPlayerTurn: true, gameStarted: true, timer: 0 };
    const customWrapper = ({ children }) => (
      <AppContext.Provider value={{ state: customState, actions: mockActions }}>
        {children}
      </AppContext.Provider>
    );
    renderHook(() => useGame(), { wrapper: customWrapper });

    expect(mockActions.botMove).toHaveBeenCalledTimes(1);
  });

  it('should call setEndOfGame when game state changes to winner or tie', () => {
    const customState = { ...initialState, squares: ['X', 'X', 'X', null, null, null, null, null, null] };
    const customWrapper = ({ children }) => (
      <AppContext.Provider value={{ state: customState, actions: mockActions }}>
        {children}
      </AppContext.Provider>
    );
    renderHook(() => useGame(), { wrapper: customWrapper });

    expect(mockActions.setEndOfGame).toHaveBeenCalledTimes(1);
    expect(mockActions.setEndOfGame).toHaveBeenCalledWith({ winner: 'X', winningLine: [0, 1, 2] });
  });

  it('should call botMove when player timer reaches 0', () => {
    const customState = { ...initialState, isPlayerTurn: true, gameStarted: true, timer: 0 };
    const customWrapper = ({ children }) => (
      <AppContext.Provider value={{ state: customState, actions: mockActions }}>
        {children}
      </AppContext.Provider>
    );
    renderHook(() => useGame(), { wrapper: customWrapper });

    expect(mockActions.botMove).toHaveBeenCalledTimes(1);
  });

  it('should call setEndOfGame when game state changes to winner or tie', () => {
    const customState = { ...initialState, squares: ['X', 'X', 'X', null, null, null, null, null, null] };
    const customWrapper = ({ children }) => (
      <AppContext.Provider value={{ state: customState, actions: mockActions }}>
        {children}
      </AppContext.Provider>
    );
    renderHook(() => useGame(), { wrapper: customWrapper });

    expect(mockActions.setEndOfGame).toHaveBeenCalledTimes(1);
    expect(mockActions.setEndOfGame).toHaveBeenCalledWith({ winner: 'X', winningLine: [0, 1, 2] });
  });
});
