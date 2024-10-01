let currentPlayer = 1;
let player1Name = "";
let player2Name = "";

const columns = 7;
const rows = 6;
const board = [];

const gameBoard = document.getElementById('game-board');
const messageDiv = document.getElementById('message');

function startGame() {
    document.getElementById('hg').innerHTML = "Restart";
    player1Name = document.getElementById('player1').value || "Player 1";
    player2Name = document.getElementById('player2').value || "Player 2";

    createBoard();
    displayBoard();

    messageDiv.style.display = 'none';
}

function createBoard() {
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < columns; col++) {
            board[row][col] = 0; // 0 represents empty cell
        }
    }
}

function displayBoard() {
    gameBoard.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-column', col);
            cell.addEventListener('click', () => dropPiece(col));
            gameBoard.appendChild(cell);
        }
    }
}

function dropPiece(col) {
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            const piece = document.createElement('div');
            piece.className = `piece ${currentPlayer === 1 ? 'red' : 'yellow'}`;
            gameBoard.querySelector(`[data-row="${row}"][data-column="${col}"]`).appendChild(piece);
            
            if (checkWin(row, col)) {
                displayWinner();
                return;
            }
            
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            return;
        }
    }
}

function checkWin(row, col) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]]; // vertical, horizontal, diagonal (both directions)
    for (let [dr, dc] of directions) {
        let count = 1;
        for (let i = 1; i <= 3; i++) {
            const newRow = row + dr * i;
            const newCol = col + dc * i;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns && board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        if (count === 4) {
            return true;
        }
    }
    return false;
}

function displayWinner() {
    const winnerName = currentPlayer === 1 ? player1Name : player2Name;
    messageDiv.innerHTML = `<h2>${winnerName} wins!</h2>`;
    messageDiv.style.display = 'block';
}
