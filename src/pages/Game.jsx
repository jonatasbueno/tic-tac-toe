import { Board } from "../components/container/board/Board";
import { useGame } from "../hooks/useGame";

export const Game = () => {
  const {
    message,
    isXTurn,
    squares,
    winningLine,
    playerColor,
    botColor,
    timer,
    winner,
    playerWins,
    botWins,
    gameStarted,
    handleClick,
    resetGame,
    changePlayerColor,
    startGame,
  } = useGame();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 @sm:text-4xl @md:text-5xl">
        Jogo da Velha
      </h1>
      <div className="mb-4 text-xl font-medium text-gray-700 @sm:text-2xl">
        {message ||
          (gameStarted && !winner
            ? `Próximo: ${isXTurn ? "Jogador" : "Bot"}`
            : "")}
      </div>
      <div className="mb-4 text-lg font-medium text-gray-600 @sm:text-xl">
        Placar: Jogador: {playerWins} | Bot: {botWins}
      </div>
      <div className="mb-4 text-lg font-medium text-gray-600 @sm:text-xl">
        {gameStarted && `Tempo restante: ${timer}s`}
      </div>
      <div className="mb-4">
        <select
          className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 @sm:text-lg"
          value={playerColor}
          onChange={changePlayerColor}
        >
          <option value="blue-500">Azul</option>
          <option value="red-500">Vermelho</option>
          <option value="green-500">Verde</option>
          <option value="purple-500">Roxo</option>
          <option value="yellow-500">Amarelo</option>
        </select>
      </div>

      {!gameStarted && (
        <button
          className="mb-6 px-6 py-3 bg-green-500 text-white font-bold rounded-lg
              hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500
              @sm:px-8 @sm:py-4 @sm:text-lg"
          onClick={startGame}
        >
          Iniciar Jogo
        </button>
      )}

      {gameStarted && (
        <Board
          squares={squares}
          onClick={handleClick}
          winningLine={winningLine}
          playerColor={playerColor}
          botColor={botColor}
        />
      )}
      
      {gameStarted && (
        <button
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg
              hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
              @sm:px-8 @sm:py-4 @sm:text-lg"
          onClick={resetGame}
        >
          Reiniciar Jogo
        </button>
      )}
    </div>
  );
};
