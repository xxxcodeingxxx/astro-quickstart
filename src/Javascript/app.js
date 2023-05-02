console.log('We are connected MuthaFookrs!!')
let currentPlayer = 'X'
let gameBoard = ['', '', '', '', '', '', '', '', '']
const cells = document.querySelectorAll('.cell')
const restartButton = document.querySelector('#restart')
const winMsg = document.querySelector('.winnerMsg')
const X_score = 0
const O_score = 0

function playMove(position) {
    if (gameBoard[position] === '') {
        gameBoard[position] = currentPlayer
        cells[position].innerText = currentPlayer
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    }
}

function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i]
        if (
            gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            return gameBoard[a]
        }
    }

    return null
}

function render() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
            cells[i].classList.add('bg-white')
            playMove(i)
            const winner = checkForWinner()
            if (winner) {
                winMsg.innerHTML = `🎉 Player ${winner} wins! 🎉`

                document.querySelector(`.scoreboard_${winner}`).innerHTML = +1
            }
        })
    }

    restartButton.addEventListener('click', () => {
        currentPlayer = 'X'
        gameBoard = ['', '', '', '', '', '', '', '', '']
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = ''
            cells[i].classList.remove('bg-white')
        }
        winMsg.innerHTML = ''
    })
}

render()
