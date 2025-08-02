import { useState, useEffect } from "react";
import { useAppContext } from "../../application/hooks/useAppContext";
import { botMove } from "../../infrastructure/functions";

export const useGame = () => {
  const { state, setPlayer, setBot } = useAppContext();
  const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState([]);
    const [timer, setTimer] = useState(5);
    const [message, setMessage] = useState('');
    const [playerColor, setPlayerColor] = useState('blue-500');
    const [botColor] = useState('black');
    const [playerWins, setPlayerWins] = useState(0);
    const [botWins, setBotWins] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

  // Função para verificar o vencedor (usando checkGameState do código fornecido)
  const checkGameState = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      return "tie";
    }

    return null;
  };


  // Efeito para verificar o vencedor após cada jogada
    useEffect(() => {
      const result = checkGameState(squares);
      if (result) {
        if (result === 'tie') {
          setMessage('Empate!');
          setTimer(0);
        } else {
          setWinner(result);
          setWinningLine(squares.reduce((acc, val, idx) => {
            if (val === result) acc.push(idx);
            return acc;
          }, []));
          setMessage(`Vencedor: ${result === 'X' ? 'Jogador' : 'Bot'}`);
          setTimer(0);
          if (result === 'X') setPlayerWins((prev) => prev + 1);
          if (result === 'O') setBotWins((prev) => prev + 1);
        }
      }
    }, [squares]);

  // Efeito para acionar a jogada do bot
    useEffect(() => {
      if (!isXTurn && !winner && gameStarted && checkGameState(squares) !== 'tie') {
        setMessage('Aguarde o bot...');
        setTimeout(() => {
          handleBotMove();
          if (!checkGameState(squares)) {
            setMessage('Agora é sua vez!');
            setTimer(5);
          }
        }, 1000);
      }
    }, [isXTurn, winner, squares, gameStarted]);

  

 // Efeito para gerenciar o temporizador (jogador)
    useEffect(() => {
      if (!isXTurn || winner || !gameStarted || checkGameState(squares) === 'tie') return;

      setTimer(5);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setMessage('O tempo acabou kkkk! Seja mais rápido no próximo turno, aguarde o bot...');
            setTimeout(() => {
              handleBotMove();
              if (!checkGameState(squares)) {
                setMessage('Agora é sua vez!');
                setTimer(5);
              }
            }, 2000);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [isXTurn, winner, squares, gameStarted]);

    // Função para mudar a cor do jogador
    const changePlayerColor = (event) => {
      setPlayerColor(event.target.value);
    };

  // Função para iniciar o jogo
  const startGame = () => {
    setGameStarted(true);
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningLine([]);
    setMessage("Agora é sua vez!");
    setTimer(5);
  };

  // Função para lidar com o clique do jogador
  const handleClick = (index) => {
    if (squares[index] || winner || !isXTurn) return;
    const newSquares = [...squares];
    newSquares[index] = "X";
    setSquares(newSquares);
    setIsXTurn(false);
    setTimer(5);
  };

  // Função para a jogada do bot
  const handleBotMove = () => {
    const newSquares = [...squares];
    botMove(newSquares, "O");
    setSquares(newSquares);
    setIsXTurn(true);
  };

  // Função para reiniciar o jogo
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningLine([]);
    setTimer(5);
    setMessage("Agora é sua vez!");
    setGameStarted(true);
  };


  return {
    message,
    isXTurn,
    squares,
    winningLine,
    playerColor,
    botColor,
    handleClick,
    resetGame,
    changePlayerColor,
    timer,
    winner,
    playerWins,
    botWins,
    startGame,
    gameStarted,
  };
};
