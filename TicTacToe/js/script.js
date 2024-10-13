const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let scores = { X: 0, O: 0 };
let gameState = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize score from local storage if available
function initScore() {
  const storedScores = JSON.parse(localStorage.getItem("tictactoeScores"));
  if (storedScores) {
    scores = storedScores;
  }
  updateScoreboard();
}

function updateScoreboard() {
  document.getElementById("xScore").textContent = `X: ${scores.X}`;
  document.getElementById("oScore").textContent = `O: ${scores.O}`;
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = clickedCell.getAttribute("data-index");

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWinner()) {
    endGame(false);
  } else if (gameState.every(cell => cell !== "")) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      highlightWinningCells([a, b, c]);
      return true;
    }
  }
  return false;
}

function highlightWinningCells(winningCells) {
  winningCells.forEach(index => {
    cells[index].classList.add("glow");
  });
}

function endGame(draw) {
  gameActive = false;

  if (draw) {
    statusText.textContent = "It's a draw!";
  } else {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    scores[currentPlayer]++;
    localStorage.setItem("tictactoeScores", JSON.stringify(scores)); // Save the score
    updateScoreboard();
  }

  // Make all cells unselectable
  cells.forEach(cell => {
    cell.classList.add("disabled");
  });
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player X's turn`;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("glow", "disabled");
  });

  // Add spin animation
  board.classList.add("spin");
  setTimeout(() => {
    board.classList.remove("spin");
  }, 1000);
}

// Event Listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);

// Initialize the game
initScore();
