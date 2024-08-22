const cells = document.getElementsByClassName('cell');
const statusText = document.getElementById('statusText');
const button = document.getElementById('button');
const holatlar = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let uyinTugadi = false;

Array.from(cells).forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!cell.textContent && !uyinTugadi) {
            cell.textContent = currentPlayer;
            options[index] = currentPlayer;
            checkWinner();
        }
    })
});


function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < holatlar.length; i++) {
        const condition = holatlar[i];
        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];


        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            uyinTugadi = true;
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins`;
        uyinTugadi = true;
    }
    else if (!options.includes("")) {
        statusText.textContent = "It's a draw";
        uyinTugadi = true;
    }
    else {
        changePlayer();
    }
}

button.addEventListener('click', restartGame);

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    Array.from(cells).forEach(cell => (cell.textContent = ""));
    uyinTugadi = false;
}