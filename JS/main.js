import { setGame, setTwo, getScore, updateScore } from './board.js';
import { slideLeft, slideRight, slideUp, slideDown } from './slide.js';

window.onload = function () {
  setGame();  // Initialize the game
};

document.addEventListener("keyup", (e) => {
  let boardChanged = false;

  if (e.code === "ArrowLeft") {
    boardChanged = slideLeft();
  } else if (e.code === "ArrowRight") {
    boardChanged = slideRight();
  } else if (e.code === "ArrowUp") {
    boardChanged = slideUp();
  } else if (e.code === "ArrowDown") {
    boardChanged = slideDown();
  }

  if (boardChanged) {
    if (getScore() > 500) {
      setTwo(); // Add additional tile if score > 500
    }
    setTwo(); // Add a new tile after a valid move
  }

  updateScore();  // Update the score display
});
