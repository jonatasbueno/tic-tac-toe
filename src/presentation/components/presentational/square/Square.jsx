import PropTypes from 'prop-types';


export const Square = ({ value = null, onClick = () => {}, isWinning = false }) => {
  return (
    <button
      className={`w-20 h-20 text-4xl font-bold border-2 border-gray-300 flex items-center justify-center
        ${isWinning ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-100'}
        focus:outline-none focus:ring-2 focus:ring-blue-500
        @sm:w-24 @sm:h-24 @md:w-28 @md:h-28 @lg:text-5xl`}
      onClick={onClick}
      disabled={value !== null}
    >
      {value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null]),
  onClick: PropTypes.func.isRequired,
  isWinning: PropTypes.bool.isRequired,
}