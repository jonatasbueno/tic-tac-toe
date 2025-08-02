import { useEffect, useCallback, useState } from "react";

import { useAppStore } from "../store/useAppStore";
import { botMove, checkGameState } from "../utils/functions";

export const useGame = () => {
  const {
    state: {
      squares,
      winner,
      gameStarted,
      playerColor,
      botColor,
      playerWins,
      botWins,
      message,
      winningLine,
    },
    setSquares,
    setWinner,
    setWinningLine,
    setMessage,
    setPlayerColor,
    setPlayerWins,
    setBotWins,
    setGameStarted,
  } = useAppStore();
  const [timer, setTimer] = useState(5)
  const [isXTurn, setIsXTurn] = useState(null);

  // Função para a jogada do bot
  const handleBotMove = useCallback(() => {
    const newSquares = [...squares];
    botMove(newSquares, "O");
    setSquares(newSquares);
    setIsXTurn(true);
  }, [squares, setSquares, setIsXTurn]);

  // Função para lidar com o tempo esgotado
  const handleTimeOut = useCallback(() => {
    setMessage(
      "O tempo acabou kkkk! Seja mais rápido no próximo turno, aguarde o bot..."
    );
    setTimeout(() => {
      handleBotMove();
      if (!checkGameState(squares)) {
        setMessage("Agora é sua vez!");
        setTimer(5);
      }
    }, 2000);
  }, [squares, setMessage, setTimer, handleBotMove]);

  // Efeito para verificar o vencedor após cada jogada
  useEffect(() => {
    const result = checkGameState(squares);
    if (result) {
      if (result === "tie") {
        setMessage("Empate!");
        setTimer(0);
      } else {
        setWinner(result);
        setWinningLine(
          squares.reduce((acc, val, idx) => {
            if (val === result) acc.push(idx);
            return acc;
          }, [])
        );
        setMessage(`Vencedor: ${result === "X" ? "Jogador" : "Bot"}`);
        setTimer(0);
        if (result === "X") setPlayerWins((prev) => prev + 1);
        if (result === "O") setBotWins((prev) => prev + 1);
      }
    }
  }, [
    squares,
    setWinner,
    setWinningLine,
    setMessage,
    setPlayerWins,
    setBotWins,
    setTimer,
  ]);

  // Efeito para acionar a jogada do bot
  useEffect(() => {
    if (
      !isXTurn &&
      !winner &&
      gameStarted &&
      checkGameState(squares) !== "tie"
    ) {
      setMessage("Aguarde o bot...");
      setTimeout(() => {
        handleBotMove();
        if (!checkGameState(squares)) {
          setMessage("Agora é sua vez!");
          setTimer(5);
        }
      }, 1000);
    }
  }, [
    isXTurn,
    winner,
    gameStarted,
    setMessage,
    setTimer,
    squares,
    handleBotMove,
  ]);

  // Efeito para gerenciar o temporizador do jogador
  useEffect(() => {
    // Não inicia o temporizador se não for turno do jogador, o jogo não começou, ou há empate/vitória
    if (
      !isXTurn ||
      winner ||
      !gameStarted ||
      checkGameState(squares) === "tie"
    ) {
      return;
    }

    // Inicia o temporizador em 5 segundos
    setTimer(5);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // Para o intervalo quando o tempo acaba
          handleTimeOut(); // Executa a lógica de tempo esgotado
          return 5; // Reseta o valor do temporizador
        }
        return prev - 1; // Decrementa o temporizador
      });
    }, 1000);

    // Limpa o intervalo ao desmontar ou quando as dependências mudarem
    return () => clearInterval(interval);
  }, [isXTurn, winner, squares, gameStarted, setTimer, handleTimeOut]);

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
    timer,
    winner,
    playerWins,
    botWins,
    gameStarted,
    startGame,
    handleClick,
    resetGame,
    changePlayerColor,
  };
};
