const player = (name, marker) => {
    return { name, marker }
}

const GameBoard = (() => {
    let grid, playerName, reset, back;
    let arr = [];
    let turn = 0;
    let gameOver = false
    let GameBoard = () => arr = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    let currentPlayer = () => turn % 2 == 0 ? player1 : player2;
    let switchPlayerTurn = () => {
        turn++;
        updatePlayerName();
    }
    let addHTML = () => {
        grid = document.querySelectorAll('.box');
        playerName = document.getElementById('playerName');
        reset = document.getElementById('reset');
        back = document.getElementById('back');
    }
    let input = () => {
        grid.forEach((x, index) => {
            x.addEventListener('click', () => {
                if (gameOver) return;
                const row = Math.floor(index / 3);
                const col = index % 3;
                if (validMove(row, col)) {
                    putMarker(row, col, currentPlayer().marker);
                    x.textContent = currentPlayer().marker;
                    if (checkDraw()) {
                        gameOver = true;
                        return;
                    }
                    if (checkWinner()) {
                        gameOver = true;
                        return;
                    }
                    else switchPlayerTurn();
                }

            })
        })
    }
    const putMarker = (row, col, marker) => {
        arr[row][col] = marker;
    }
    const validMove = (row, col) => { if (arr[row][col] == '-') return true; }
    const updatePlayerName = () => playerName.textContent = `${currentPlayer().name}'s turn`;
    const checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (checkLine(arr[i][0], arr[i][1], arr[i][2])) return true;
            if (checkLine(arr[0][i], arr[1][i], arr[2][i])) return true;

        }
        if (checkLine(arr[0][0], arr[1][1], arr[2][2])) return true;
        if (checkLine(arr[0][2], arr[1][1], arr[2][0])) return true;

    }
    const checkLine = (a, b, c) => {
        if (a == b && b == c && a != '-' && b != '-' && c != '-') {
            playerName.textContent = `${currentPlayer().name} is winner`;
            return true;
        }
        else return false;
    }
    const checkDraw = () => {
        if (turn == 8) {
            playerName.textContent = `It's Draw`;
            return true;
        }
        else return false;
    }
    const resetbtn = () => {
        reset.addEventListener('click', () => {
            GameBoard();
            grid.forEach(x => {
                x.textContent = '';
            })
            turn = 0;
            updatePlayerName();
        })
    }
    const backbtn = () => {
        back.addEventListener('click', () => {
            window.location.href = 'index.html';
        })
    }
    return { GameBoard, addHTML, input, resetbtn, updatePlayerName, backbtn };

})();
let player1Name = localStorage.getItem('p1');
let player2Name = localStorage.getItem('p2');
let player1 = player(player1Name, 'O');
let player2 = player(player2Name, 'X');
function newGame() {
    GameBoard.GameBoard();
    GameBoard.addHTML();
    GameBoard.updatePlayerName()
    GameBoard.input();
    GameBoard.resetbtn();
    GameBoard.backbtn();
}
newGame();