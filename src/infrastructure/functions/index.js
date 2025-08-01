export function checkGameState(board) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  if (board.every(cell => cell !== null)) {
    return 'tie';
  }

  return null;
}

function minimax(board, depth, isMaximizing) {
  const result = checkGameState(board);
  if (result !== null) {
    if (result === 'O') return { score: 10 - depth }
    if (result === 'X') return { score: depth - 10 }
    return { score: 0 }
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false).score;
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove = null;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true).score;
        board[i] = null;
        if (score < bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return { score: bestScore, move: bestMove };
  }
}

export function botMove(board, icon) {
  const { move } = minimax(board, 0, true);
  if (move !== null) {
    board[move] = icon;
  }
  return move;
}