import PropTypes from 'prop-types';

export const Square = ({ value, onClick, isWinning, playerColor, botColor }) => {
  const colorClass = value === 'X' ? playerColor : botColor;
  const winningClass = isWinning ? 'bg-green-500 scale-110' : 'bg-gray-700';

  const ariaLabel = value === null ? 'Casa vazia' : `Casa com ${value}`;

  return (
    <button
      className={`w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-5xl md:text-6xl font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${winningClass}`}
      onClick={onClick}
      role="button"
      aria-label={ariaLabel}
    >
      <span className={colorClass}>{value}</span>
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null]),
  onClick: PropTypes.func.isRequired,
  isWinning: PropTypes.bool.isRequired,
  playerColor: PropTypes.string.isRequired,
  botColor: PropTypes.string.isRequired,
};