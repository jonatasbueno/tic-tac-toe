import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, beforeEach, it, expect } from 'vitest';

import { Home } from './Home';
import { useAppStore } from '../store/useAppStore';

vi.mock('../store/useAppStore');

const mockNavigate = vi.fn();

describe('Home', () => {
  const mockChangePlayerName = vi.fn();

  beforeEach(() => {
    useAppStore.mockReturnValue({
      actions: {
        changePlayerName: mockChangePlayerName,
      },
    });
    vi.mock('react-router-dom', async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useNavigate: () => mockNavigate,
      };
    });
  });

  it('should render the game title', () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByText('Jogo da Velha')).toBeInTheDocument();
  });

  it('should update name on input change', () => {
    render(<Home />, { wrapper: MemoryRouter });
    const input = screen.getByPlaceholderText('Digite seu nome');
    fireEvent.change(input, { target: { value: 'TestPlayer' } });
    expect(input.value).toBe('TestPlayer');
  });

  it('should enable start game button when name is entered', () => {
    render(<Home />, { wrapper: MemoryRouter });
    const input = screen.getByPlaceholderText('Digite seu nome');
    const button = screen.getByText('Iniciar Jogo');
    fireEvent.change(input, { target: { value: 'TestPlayer' } });
    expect(button).toBeEnabled();
  });

  it('should call changePlayerName and navigate on start game', () => {
    render(<Home />, { wrapper: MemoryRouter });
    const input = screen.getByPlaceholderText('Digite seu nome');
    const button = screen.getByText('Iniciar Jogo');
    fireEvent.change(input, { target: { value: 'TestPlayer' } });
    fireEvent.click(button);
    expect(mockChangePlayerName).toHaveBeenCalledWith('TestPlayer');
    expect(mockNavigate).toHaveBeenCalledWith('/game');
  });

  it('should not start game if name is empty', () => {
    render(<Home />, { wrapper: MemoryRouter });
    const button = screen.getByText('Iniciar Jogo');
    expect(button).toBeDisabled();
  });
});
