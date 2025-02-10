Telegram.WebApp.ready();

const BOARD_SIZE = 10;
let board = []; // 0 - empty, 1 - ship, 2 - miss, 3 - hit
let ships = [[1,1,1], [1,1]]; // Example ships

const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");

function initBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = 0;
        }
    }
}

function placeShips() {
  for (let ship of ships) {
    let placed = false;
    while (!placed) {
      let x = Math.floor(Math.random() * BOARD_SIZE);
      let y = Math.floor(Math.random() * (BOARD_SIZE - ship.length + 1));
      let valid = true;
      for (let i = 0; i < ship.length; i++) {
        if (board[x][y+i] !== 0) {
          valid = false;
          break;
        }
      }
      if (valid) {
        for (let i = 0; i < ship.length; i++) {
          board[x][y+i] = 1;
        }
        placed = true;
      }
    }
  }
}

function drawBoard() {
    gameBoard.innerHTML = "";
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = i;
            cell.dataset.y = j;

            cell.addEventListener("click", handleCellClick);

            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    if (board[x][y] === 1) {
        board[x][y] = 3; // Hit
        event.target.classList.add("hit");
        message.textContent = "Hit!";
    } else if (board[x][y] === 0) {
        board[x][y] = 2; // Miss
        event.target.classList.add("miss");
        message.textContent = "Miss!";
    } else {
        message.textContent = "Already shot here!";
    }
}

initBoard();
placeShips();
drawBoard();
