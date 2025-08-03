import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Board } from './Board';

describe('Board', () => {
  const defaultProps = {
    squares: Array(9).fill(null),
    onClick: vi.fn(),
    winningLine: [],
    playerColor: 'text-blue-500',
    botColor: 'text-red-500',
  };

  it('should render 9 squares', () => {
    render(<Board {...defaultProps} />);
    const squares = screen.getAllByRole('button');
    expect(squares).toHaveLength(9);
  });

  it('should call onClick when a square is clicked', () => {
    render(<Board {...defaultProps} />);
    const square = screen.getAllByLabelText('Casa vazia')[0];
    fireEvent.click(square);
    expect(defaultProps.onClick).toHaveBeenCalledWith(0);
  });

  it('should apply winning styles to winning squares', () => {
    const winningProps = { ...defaultProps, squares: ['X', 'X', 'X', null, null, null, null, null, null], winningLine: [0, 1, 2] };
    render(<Board {...winningProps} />);
    const winningSquare = screen.getAllByLabelText('Casa com X')[0];
    expect(winningSquare).toHaveClass('bg-blue-500');
    expect(winningSquare).toHaveClass('scale-110');
  });

  it('should display player Xs move', () => {
    const boardWithX = { ...defaultProps, squares: ['X', null, null, null, null, null, null, null, null] };
    render(<Board {...boardWithX} />);
    const square = screen.getByLabelText('Casa com X');
    expect(square).toHaveTextContent('X');
    expect(square.querySelector('span')).toHaveClass('text-blue-500');
  });

  it('should display bot Os move', () => {
    const boardWithO = { ...defaultProps, squares: [null, 'O', null, null, null, null, null, null, null] };
    render(<Board {...boardWithO} />);
    const square = screen.getByLabelText('Casa com O');
    expect(square).toHaveTextContent('O');
    expect(square.querySelector('span')).toHaveClass('text-red-500');
  });
});
