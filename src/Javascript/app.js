console.log('We are connected MuthaFookrs!!')
let currentPlayer = 'X'
let gameBoard = ['', '', '', '', '', '', '', '', '']
const cells = document.querySelectorAll('.cell')
const restartButton = document.querySelector('#restart')
const winMsg = document.querySelector('.winnerMsg')
const grandWin = document.querySelector('.grandWin')
const audio = document.querySelector('.grandWin_audio')
const audioFile = '<audio autoplay src="/Audio/rocket_sound.mp3"></audio>'
const audioFile2 = '<audio autoplay src="/Audio/game_fail.mp3"></audio>'
const hearts = document.querySelectorAll('.hearts')
const board = document.querySelector('.board')
const dirs = document.getElementById('directions')
const hide = document.getElementById('hide')
let X_score = 0
let O_score = 0
let score

hide.addEventListener('click', () => {
    if (dirs.classList != 'hidden') {
        dirs.classList.toggle('hidden')
        if (hide.textContent === 'Show') {
            hide.textContent = 'Hide'
        } else {
            hide.textContent = 'Show'
        }
    }
})

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

    // Check for a tie game
    if (!gameBoard.includes('')) {
        return 'tie'
    }

    return null
}

function render() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
            cells[i].classList.add('bg-white')
            playMove(i)
            const winner = checkForWinner()
            const win = `🎉 Player ${winner} wins! 🎉`
            const grand = ` Player ${winner} Is Grand Winner! `
            if (winner) {
                for (let i = 0; i < cells.length; i++) {
                    cells[i].classList.add('no-select')
                }
                winMsg.innerHTML = win
            }
            if (winner === 'X') {
                X_score += 1
                document.querySelector('.scoreboard_X').textContent = X_score
                if (X_score === 10) {
                    grandWin.textContent = grand
                    audio.innerHTML = audioFile
                    for (let i = 0; i < hearts.length; i++) {
                        hearts[i].classList.remove('hidden')
                    }
                    restartButton.addEventListener('click', () => {
                        document.location.reload()
                    })
                }
            }
            if (winner === 'O') {
                O_score += 1
                document.querySelector('.scoreboard_O').textContent = O_score
                if (O_score === 10) {
                    grandWin.textContent = grand
                    audio.innerHTML = audioFile
                    for (let i = 0; i < hearts.length; i++) {
                        hearts[i].classList.remove('hidden')
                    }
                    restartButton.addEventListener('click', () => {
                        document.location.reload()
                    })
                }
            }
            if (winner === 'tie') {
                audio.innerHTML = audioFile2
                winMsg.innerHTML = '😾 Cats Game! Draw! 😾'
            }
        })
    }
    // Restart game in between rounds to clear board
    restartButton.addEventListener('click', () => {
        currentPlayer = 'X'
        gameBoard = ['', '', '', '', '', '', '', '', '']
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = ''
            cells[i].classList.remove('bg-white', 'no-select')
        }
        winMsg.innerHTML = ''
        audio.innerHTML = ''
    })
}

render()
