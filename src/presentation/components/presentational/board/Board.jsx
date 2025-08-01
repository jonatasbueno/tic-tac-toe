import PropTypes from 'prop-types';

import { Square } from '../square/Square';

export const Board = ({ squares = [], onClick = () => {}, winningLine = [] }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-gray-100 rounded-lg shadow-md
      @container @sm:p-6 @md:p-8">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onClick(index)}
          isWinning={winningLine.includes(index)}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])).isRequired,
  onClick: PropTypes.func.isRequired,
  winningLine: PropTypes.arrayOf(PropTypes.number).isRequired,
};