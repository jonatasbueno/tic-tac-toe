import { Board } from '../components/presentational/board/Board';
import { useGame } from '../../application/hooks/useGame';

export const Game = () => {
  const {
    squares,
    winningLine,
    handleClick,
    resetGame,
    status,
  } = useGame();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 @sm:text-4xl @md:text-5xl">
        Jogo da Velha
      </h1>
      <div className="mb-4 text-xl font-medium text-gray-700 @sm:text-2xl">
        {status}
      </div>
      <Board squares={squares} onClick={handleClick} winningLine={winningLine} />
      <button
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg
          hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
          @sm:px-8 @sm:py-4 @sm:text-lg"
        onClick={resetGame}
      >
        Reiniciar Jogo
      </button>
    </div>
  );
};