document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector("#game-board");
  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  function createBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleCellClick);
      board.append(cell);
    }
  }

  function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (gameBoard[index] === "" && gameActive) {
      gameBoard[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      if (checkWin()) {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
      } else if (checkDraw()) {
        alert("It's a draw!");
        resetGame();
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  function checkWin() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some((el) => {
      const [a, b, c] = el;
      return (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      );
    });
  }

  function checkDraw() {
    return !gameBoard.includes("");
  }

  function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";

    document.querySelectorAll(".cell").forEach((el) => {
      el.textContent = "";
    });
  }

  createBoard();
});
