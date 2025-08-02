import PropTypes from 'prop-types';

import { Square } from '../square/Square';

export const Board = ({
  squares = [],
  onClick = () => {},
  winningLine = [],
  playerColor,
  botColor,
}) => {
  return (
    <div
      className="grid grid-cols-3 gap-2 p-4 bg-gray-800 rounded-lg shadow-lg"
      role="grid"
      aria-label="Tabuleiro do Jogo da Velha"
    >
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onClick(index)}
          isWinning={winningLine.includes(index)}
          playerColor={playerColor}
          botColor={botColor}
          aria-label={`Casa ${index + 1}: ${value === null ? 'vazia' : value}`}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])).isRequired,
  onClick: PropTypes.func.isRequired,
  winningLine: PropTypes.arrayOf(PropTypes.number).isRequired,
  playerColor: PropTypes.string.isRequired,
  botColor: PropTypes.string.isRequired,
};