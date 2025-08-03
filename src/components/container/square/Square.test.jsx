import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import { Square } from './Square';

describe('Square', () => {
  const defaultProps = {
    value: null,
    onClick: vi.fn(),
    isWinning: false,
    playerColor: 'blue-500',
    botColor: 'red-500',
  };

  it('should render a button', () => {
    render(<Square {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should display the correct value', () => {
    render(<Square {...defaultProps} value="X" />);
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    render(<Square {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply winning styles if isWinning is true', () => {
    render(<Square {...defaultProps} isWinning={true} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-green-500');
    expect(button).toHaveClass('scale-110');
  });

  it('should apply player color for X', () => {
    render(<Square {...defaultProps} value="X" playerColor="text-purple-500" />);
    expect(screen.getByText('X')).toHaveClass('text-purple-500');
  });

  it('should apply bot color for O', () => {
    render(<Square {...defaultProps} value="O" botColor="text-yellow-500" />);
    expect(screen.getByText('O')).toHaveClass('text-yellow-500');
  });

  it('should have correct aria-label for empty square', () => {
    render(<Square {...defaultProps} value={null} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Casa vazia');
  });

  it('should have correct aria-label for X square', () => {
    render(<Square {...defaultProps} value="X" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Casa com X');
  });
});
