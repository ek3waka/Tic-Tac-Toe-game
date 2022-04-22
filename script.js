
Array.prototype.hasAll = function(a) {
  let hash = this.reduce(function(acc, i) { acc[i] = true; return acc; }, {});
  return a.every(function(i) { return i in hash; });
}

let gameBoard = {
    board: ['', '', '', '', '', '', '', '', ''],
    winningCombinations: [
           [0, 1, 2], 
           [0, 3, 6], 
           [0, 4, 8], 
           [3, 4, 5], 
           [1, 4, 7], 
           [2, 4, 6], 
           [6, 7, 8], 
           [2, 5, 8] 
                        ],
}

const player = (name, sign) => {
  const getName  = () => name;
  let playerSigns = [];
  let score = 0;
  const clearSigns = () => {
      playerSigns.length = 0
  }
  const getSign = () => sign;
  const getScore = () => score
  const addSign = sign => {
      playerSigns.push(sign)
  }
  const addScore = () => ++score
  
  return {
    playerSigns, 
    getName, 
    getSign, 
    addScore, 
    clearSigns, 
    addSign, 
    getScore
  }
}

let scores = document.querySelector('.scores')
let playersScore = document.querySelector('.playersScore')

const main = document.querySelector('main')
const cellGrid = document.createElement('div')
const restartButton = document.createElement('button')

const popup = document.getElementById("score")
popup.addEventListener('click', () =>  popup.classList.toggle("show"))

let start = document.querySelector('.start-game');
start.addEventListener('click', () => gameModule.startGame())


const displayGrid = (function() {
  function createCells() { 
    cellGrid.classList.add('game-field')
    main.appendChild(cellGrid)
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div')
        cell.classList.add('game-cell')
        cell.id = i
        cell.textContent = gameBoard.board[i]
        cellGrid.appendChild(cell)
  }}

  function deleteCells() {
    main.removeChild(restartButton)
    while (cellGrid.firstChild) {
      cellGrid.removeChild(cellGrid.firstChild)
  }}

  function addRestartButton() {
    restartButton.classList.add('restart')
    restartButton.textContent = 'Restart game'
    main.appendChild(restartButton);
  }

  return {
    createCells,
    deleteCells,
    addRestartButton
  }
})()

const gameModule = (function() {
  let player1, player2
  let circleTurn

 
  function startGame() {
    player1 = player(document.getElementById('player1').value, '✕')
    player2 = player(document.getElementById('player2').value, '◯')
  
    let player1name = document.getElementById('player1name')
    let plater2name = document.getElementById('player2name')
  
    player1name.textContent = player1.getName()
    player2name.textContent = player2.getName()
  
    main.classList.toggle('prestart')
    document.getElementById('player1').classList.add('hidden')
    document.getElementById('player2').classList.add('hidden')
  
    displayGrid.createCells()
    displayGrid.addRestartButton()
    start.classList.add('hidden')
    scores.classList.remove('hidden');
    const restart = document.querySelector('.restart')
    restart.addEventListener('click', () => restartGame())
    startRound()
  }
  
  function startRound() {
    circleTurn = false
    const cellElements = document.querySelectorAll('.game-cell')

    cellElements.forEach(cell => {
      cell.addEventListener('mouseenter', e => {
        if (e.target.textContent == ''){
          const currentPlayer = circleTurn ? player2 : player1
          e.target.textContent = currentPlayer.getSign()
          e.target.style.color = 'grey'
        }
      })
      cell.addEventListener('mouseleave', e => {
        const currentPlayer = circleTurn ? player2 : player1
        const cell = e.target.getAttribute('id')
        e.target.textContent = gameBoard.board[cell]
        e.target.style.color = ''
      })   
    })

    cellElements.forEach(cell => {
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
    })
  }
  
  function handleClick(e) {
    const currentPlayer = circleTurn ? player2 : player1
    const cell = e.target.getAttribute('id')
    currentPlayer.addSign(e.target.getAttribute('id'))
    gameBoard.board[e.target.getAttribute('id')] = currentPlayer.getSign()

    e.target.textContent = gameBoard.board[cell]
    if (isWin(currentPlayer)) { 
      endGame(false, currentPlayer)
    } else if (isDraw()) {
      endGame(true, currentPlayer)
    } else {
      swapPlayers()
    }
   }
  
  function isWin(currentPlayer) {
      for (let i=0; i<gameBoard.winningCombinations.length; i++) {
        if (currentPlayer.playerSigns.hasAll(gameBoard.winningCombinations[i])) {
          return true
        } 
      } 
      return false  
  }
  
  function isDraw() {
    if (gameBoard.board.indexOf('') === -1) {
        return true
    } else return false
  }
  
  function restartGame() {
    gameBoard.board = ['', '', '', '', '', '', '', '', ''];
    const cellElements = document.querySelectorAll('.game-cell')
    cellElements.forEach(cell => {
      cell.textContent = ''
    })
    player1.clearSigns()
    player2.clearSigns()
    displayScore(player1.getScore(), player2.getScore())
    startRound()
  }
  
  function swapPlayers() {
      circleTurn = !circleTurn
  }
  
  function displayScore (player1Score, player2Score) {
    playersScore.textContent=`${player1Score}-${player2Score}`
  }
  
  function endGame(draw, player) {
    if (draw) { 
      popup.textContent = `Draw!`
      popup.classList.toggle("show")
    } else {
      popup.textContent = `${player.getName()} wins!`
      popup.classList.toggle("show")
      player.addScore()
    }
      restartGame()
    }
    
  return {
    startGame
    }
})()