import { Board } from "../components/container/board/Board";
import { useGame } from "../hooks/useGame";

export const Game = () => {
  const {
    state: {
      message,
      squares,
      winningLine,
      playerColor,
      botColor,
      timer,
      winner,
      playerWins,
      botWins,
      gameStarted,
      playerName,
      isPlayerTurn,
    },
    actions: { resetGame, startGame, handleClick, changePlayerColor },
  } = useGame();
  const turn = `Próximo: ${isPlayerTurn ? playerName : "Bot"}`;
  const timerText = timer > 0 ? `${timer} segundos` : "1 segundo";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6 animate-pulse">
        Jogo da Velha
      </h1>
      <div className="mb-4 text-xl md:text-2xl font-medium text-gray-300">
        {message || (gameStarted && !winner && turn)}
      </div>
      <div className="mb-4 text-lg md:text-xl font-medium text-gray-400">
        <div className="text-xl text-center">Placar</div>
        <ul className="flex gap-4">
          <li className="text-blue-400">
            {playerName}: {playerWins}
          </li>
          <li className="text-red-400">Bot: {botWins}</li>
        </ul>
      </div>
      <div className="mb-4 text-lg md:text-xl font-medium text-yellow-400">
        {gameStarted && `Tempo: ${timerText}`}
      </div>
      <div className="mb-4">
        <select
          className="px-4 py-2 bg-gray-800 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={playerColor}
          onChange={(e) => changePlayerColor(e.target.value)}
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
          className="mb-6 px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
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
          className="mt-6 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          onClick={resetGame}
        >
          Reiniciar Jogo
        </button>
      )}
    </div>
  );
};
