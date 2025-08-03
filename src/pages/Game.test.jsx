import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect } from 'vitest';

import { Game } from './Game';
import { useGame } from '../hooks/useGame';

vi.mock('../hooks/useGame');

describe('Game', () => {
  const mockUseGame = {
    state: {
      message: '',
      squares: Array(9).fill(null),
      winningLine: [],
      playerColor: 'blue-500',
      botColor: 'red-500',
      timer: 5,
      winner: null,
      playerWins: 0,
      botWins: 0,
      gameStarted: false,
      playerName: 'Jogador',
      isPlayerTurn: true,
    },
    actions: {
      resetGame: vi.fn(),
      startGame: vi.fn(),
      handleClick: vi.fn(),
      changePlayerColor: vi.fn(),
    },
  };

  beforeEach(() => {
    useGame.mockReturnValue(mockUseGame);
  });

  it('should render game title', () => {
    render(<Game />);
    expect(screen.getByText('Jogo da Velha')).toBeInTheDocument();
  });

  it('should display player and bot scores', () => {
    render(<Game />);
    expect(screen.getByText('Jogador: 0')).toBeInTheDocument();
    expect(screen.getByText('Bot: 0')).toBeInTheDocument();
  });

  it('should display start game button when game not started', () => {
    render(<Game />);
    expect(screen.getByText('Iniciar Jogo')).toBeInTheDocument();
  });

  it('should call startGame when button is clicked', () => {
    render(<Game />);
    fireEvent.click(screen.getByText('Iniciar Jogo'));
    expect(mockUseGame.actions.startGame).toHaveBeenCalledTimes(1);
  });

  it('should display board when game started', () => {
    useGame.mockReturnValue({
      ...mockUseGame,
      state: { ...mockUseGame.state, gameStarted: true },
    });
    render(<Game />);
    expect(screen.getByLabelText('Tabuleiro do Jogo da Velha')).toBeInTheDocument();
  });

  it('should display restart game button when game started', () => {
    useGame.mockReturnValue({
      ...mockUseGame,
      state: { ...mockUseGame.state, gameStarted: true },
    });
    render(<Game />);
    expect(screen.getByText('Reiniciar Jogo')).toBeInTheDocument();
  });

  it('should call resetGame when restart button is clicked', () => {
    useGame.mockReturnValue({
      ...mockUseGame,
      state: { ...mockUseGame.state, gameStarted: true },
    });
    render(<Game />);
    fireEvent.click(screen.getByText('Reiniciar Jogo'));
    expect(mockUseGame.actions.resetGame).toHaveBeenCalledTimes(1);
  });

  it('should display timer when game started', () => {
    useGame.mockReturnValue({
      ...mockUseGame,
      state: { ...mockUseGame.state, gameStarted: true, timer: 3 },
    });
    render(<Game />);
    expect(screen.getByText('Tempo: 3 segundos')).toBeInTheDocument();
  });

  it('should display player turn message', () => {
    useGame.mockReturnValue({
      ...mockUseGame,
      state: { ...mockUseGame.state, gameStarted: true, isPlayerTurn: true, playerName: 'TestPlayer' },
    });
    render(<Game />);
    expect(screen.getByText('Próximo: TestPlayer')).toBeInTheDocument();
  });

  it('should display bot turn message', () => {
    useGame.mockReturnValue({
      ...mockUseGame,
      state: { ...mockUseGame.state, gameStarted: true, isPlayerTurn: false },
    });
    render(<Game />);
    expect(screen.getByText('Próximo: Bot')).toBeInTheDocument();
  });

  it('should display winner message', () => {
    useGame.mockReturnValue({
      ...mockUseGame,
      state: { ...mockUseGame.state, gameStarted: true, winner: 'X', message: 'Jogador venceu!' },
    });
    render(<Game />);
    expect(screen.getByText('Jogador venceu!')).toBeInTheDocument();
  });

  it('should open color options when button is clicked', () => {
    render(<Game />);
    fireEvent.click(screen.getByLabelText('Mudar Cor do Jogador'));
    expect(screen.getByText('Azul')).toBeInTheDocument();
    expect(screen.getByText('Vermelho')).toBeInTheDocument();
  });

  it('should call changePlayerColor and close options when a color is selected', () => {
    render(<Game />);
    fireEvent.click(screen.getByLabelText('Mudar Cor do Jogador'));
    fireEvent.click(screen.getByText('Verde'));
    expect(mockUseGame.actions.changePlayerColor).toHaveBeenCalledWith('text-green-500');
    expect(screen.queryByText('Azul')).not.toBeInTheDocument();
  });
});
