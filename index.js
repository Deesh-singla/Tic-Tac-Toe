let gameBoard = document.getElementById("main");
let player1Input = document.getElementById("player1");
let player2Input = document.getElementById("player2");
let currentPlayer = document.getElementById("currentPlayer");
let submitBtn = document.getElementById("submit")
let resetBtn = document.getElementById("reset");
let result = document.createElement('h1');
let isWinnerDeclared = false;
let isSubmit = false;
let gameGrid = [];
let Player1 = 'Player 1';
let Player2 = 'Player 2';

if (!isSubmit) currentPlayer.textContent = `${Player1}'s Turn`;
submitBtn.addEventListener("click", () => {
    Player1 = player1Input.value;
    Player2 = player2Input.value;
    currentPlayer.textContent = `${Player1}'s Turn`;
    reset();
})

for (let i = 0; i < 3; i++) {
    gameGrid.push([])
    for (let j = 0; j < 3; j++) {
        let div = document.createElement("div")
        gameGrid[i][j] = div;
        gameBoard.append(div);
    }
}

let boxes = document.querySelectorAll("#main div")
let z = 0;

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.textContent === '' && !isWinnerDeclared) {
            if (z % 2 == 0) {
                box.textContent = 'X'
                currentPlayer.textContent = `${Player2}'s Turn`;

            }
            else {
                box.textContent = 'O'
                currentPlayer.textContent = `${Player1}'s Turn`;
            }
            z++;
            winnerCheck();
            if (!isWinnerDeclared && z == 9) {
                result.textContent = `It's Draw`;
                document.body.append(result);
            }
        }
    })
})

function winnerCheck() {
    for (let i = 0; i < 3; i++) {
        if (checkLine(gameGrid[i][0].textContent, gameGrid[i][1].textContent, gameGrid[i][2].textContent)) return;
        if (checkLine(gameGrid[0][i].textContent, gameGrid[1][i].textContent, gameGrid[2][i].textContent)) return;

    }
    if (checkLine(gameGrid[0][0].textContent, gameGrid[1][1].textContent, gameGrid[2][2].textContent)) return;
    if (checkLine(gameGrid[0][2].textContent, gameGrid[1][1].textContent, gameGrid[2][0].textContent)) return;
}

function checkLine(a, b, c) {
    if (a == b && b == c && a != '' && b != '' && c != '') {
        isWinnerDeclared = true;
        if (a == 'X') result.textContent = `X is winner`;
        else result.textContent = `O is winner`;
        document.body.append(result);
    }
    else return false;
}

function reset() {
    boxes.forEach(box => {
        box.textContent = '';
    })
    result.textContent = '';
    isWinnerDeclared = false
    currentPlayer.textContent = `${Player1}'s Turn`;
    z = 0;
}

resetBtn.addEventListener('click', reset);