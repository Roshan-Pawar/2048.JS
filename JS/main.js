import {
  rows,
  columns,
  setGame,
  setTwo,
  getScore,
  updateScore,
  resetScore,
  setBoard,
} from "./board.js";
import { slideLeft, slideRight, slideUp, slideDown } from "./slide.js";

window.onload = function () {
  const modal = document.getElementById("instructionsModal");
  const closeButton = document.getElementById("closeModal");
  const spanClose = document.querySelector(".close-btn");

  modal.style.display = "block";

  // Close the modal when the user clicks the (x)
  spanClose.onclick = function() {
    modal.style.display = "none";
    setGame();  // Start the game after the modal is closed
  };

  // Close the modal if the user clicks outside the modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      setGame();  // Start the game after the modal is closed
    }
  };
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

  updateScore(); // Update the score display
});

document.getElementById("restartButton").addEventListener("click", restartGame);

function restartGame() {

  resetScore(); // Reset the score using the function in board.js
  document.getElementById("score").innerText = getScore(); // Reset the score display

  // Clear the board array and reset the DOM
  setBoard([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // Clear the tiles visually
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "";
      tile.classList.value = "tile";
    }
  }

  // Set two new tiles
  setTwo();
  setTwo();
}
