import { botMove } from '../../infrastructure/functions';

export function player(name, isBot = false, icon, color) {
  let points = 0;

  return {
    color,
    icon,
    name,
    points,
    isBot,
    incrementPoints() {
      this.points += 1;
    },
    toPlayer(board, position = undefined) {
      if (!isBot) {
        const index = botMove(board, icon);
        board[index] = icon;

        return board
      }

      board[position] = icon

      return board
    }
  };
}