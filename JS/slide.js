import { getBoard, setBoard, addToScore, updateTile } from './board.js';

const rows = 4;
const columns = 4;

function filterZero(row) {
  return row.filter(num => num != 0); // Remove all zeros from row
}

function slide(row) {
  row = filterZero(row);

  for (let i = 0; i < row.length; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      addToScore(row[i]); // Add the merged value to the score
    }
  }

  row = filterZero(row);

  while (row.length < columns) {
    row.push(0);
  }

  return row;
}

export function slideLeft() {
  let boardChanged = false;
  let board = getBoard();
  
  for (let r = 0; r < rows; r++) {
    let originalRow = [...board[r]];
    let row = slide(board[r]);
    board[r] = row;

    if (originalRow.toString() !== row.toString()) {
      boardChanged = true;
    }

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }

  setBoard(board);
  return boardChanged;
}

export function slideRight() {
  let boardChanged = false;
  let board = getBoard();

  for (let r = 0; r < rows; r++) {
    let originalRow = [...board[r]];
    let row = board[r].reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    if (originalRow.toString() !== row.toString()) {
      boardChanged = true;
    }

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }

  setBoard(board);
  return boardChanged;
}

export function slideUp() {
  let boardChanged = false;
  let board = getBoard();

  for (let c = 0; c < columns; c++) {
    let originalCol = [board[0][c], board[1][c], board[2][c], board[3][c]];
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }

    if (originalCol.toString() !== row.toString()) {
      boardChanged = true;
    }
  }

  setBoard(board);
  return boardChanged;
}

export function slideDown() {
  let boardChanged = false;
  let board = getBoard();

  for (let c = 0; c < columns; c++) {
    let originalCol = [board[0][c], board[1][c], board[2][c], board[3][c]];
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }

    if (originalCol.toString() !== row.toString()) {
      boardChanged = true;
    }
  }

  setBoard(board);
  return boardChanged;
}
