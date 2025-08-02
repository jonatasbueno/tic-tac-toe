import { useState, useEffect } from "react";
import { useAppContext } from "../../application/hooks/useAppContext";

export const useGame = () => {
  const { state, setPlayer, setBot } = useAppContext();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line };
      }
    }
    return null;
  };

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    }
  }, [squares]);

  const handleClick = (index) => {
    if (squares[index] || winner) return; // Ignora se a célula está ocupada ou há vencedor
    const newSquares = [...squares];
    newSquares[index] = isXTurn ? "X" : "O";
    setSquares(newSquares);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningLine([]);
  };

  const status = winner
    ? `Vencedor: ${winner}`
    : squares.every((square) => square !== null)
    ? "Empate!"
    : `Próximo jogador: ${isXTurn ? "X" : "O"}`;

  return {
    squares,
    winningLine,
    status,
    handleClick,
    resetGame,
  };
};
