import { useState } from "react";
import { Board } from "../components/container/board/Board";
import { useGame } from "../hooks/useGame";

export const Game = () => {
  const [showColorOptions, setShowColorOptions] = useState(false);
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

  const colors = [
    { name: "Azul", value: "text-blue-500" },
    { name: "Vermelho", value: "text-red-500" },
    { name: "Verde", value: "text-green-500" },
    { name: "Roxo", value: "text-purple-500" },
    { name: "Amarelo", value: "text-yellow-500" },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6 animate-pulse">
        Jogo da Velha
      </h1>
      <div className="mb-4 text-xl md:text-2xl font-medium text-gray-300" aria-live="polite">
        {message || (gameStarted && !winner && turn)}
      </div>
      <div className="mb-4 text-lg md:text-xl font-medium text-gray-400">
        <h2 className="text-xl text-center">Placar</h2>
        <ul className="flex gap-4" role="list">
          <li className="text-blue-400">
            {playerName}: {playerWins}
          </li>
          <li className="text-red-400">Bot: {botWins}</li>
        </ul>
      </div>
      <div className="mb-4 text-lg md:text-xl font-medium text-yellow-400" role="status">
        {gameStarted && `Tempo: ${timerText}`}
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          className="p-3 rounded-full bg-cyan-600 text-white shadow-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ease-in-out transform hover:scale-110"
          onClick={() => setShowColorOptions(!showColorOptions)}
          aria-label="Mudar Cor do Jogador"
        >
          <span>Mudar Cor do Jogador</span>
        </button>
        {showColorOptions && (
          <div className="absolute bottom-full right-0 mb-2 w-32 bg-gray-800 rounded-lg shadow-lg p-2" role="menu">
            {colors.map((color) => (
              <button
                key={color.value}
                className={`block w-full text-left px-4 py-2 rounded-md text-white hover:bg-gray-700 ${
                  playerColor === color.value ? "ring-2 ring-cyan-500" : ""
                }`}
                onClick={() => {
                  changePlayerColor(color.value);
                  setShowColorOptions(false);
                }}
                role="menuitem"
                aria-label={`Selecionar cor ${color.name}`}
              >
                {color.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {!gameStarted && (
        <button
          className="mb-6 px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
          onClick={startGame}
          aria-label="Iniciar Jogo"
        >
          Iniciar Jogo
        </button>
      )}

      {gameStarted && (
        <>
          <Board
            squares={squares}
            onClick={handleClick}
            winningLine={winningLine}
            playerColor={playerColor}
            botColor={botColor}
          />
          
          <button
            className="mt-6 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            onClick={resetGame}
            aria-label="Reiniciar Jogo"
          >
            Reiniciar Jogo
          </button>
        </>
      )}
    </main>
  );
};
