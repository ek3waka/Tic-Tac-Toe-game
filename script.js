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




let scores = document.querySelector('.scores');
const main = document.querySelector('main');
const cellGrid = document.createElement('div');
const restartButton = document.createElement('button');



function createCells() {
      
      
      cellGrid.classList.add('game-field');
      main.appendChild(cellGrid);

      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
        cell.id = i;
        cell.textContent = gameBoard.board[i];
        cellGrid.appendChild(cell);
      
      }

      
      
      
}

function addRestartButton() {
      restartButton.classList.add('restart');
      restartButton.textContent = 'Restart game';
      main.appendChild(restartButton);
}

const gameFlow = {

}



const player = (name, sign) => {
    const getName  = () => name;
    let playerSigns = [];
    let playerScore = 0;
    const clearSigns = () => {
        playerSigns.length = 0
    }
    const getSign = () => sign;
    const addSign = sign => {
        playerSigns.push(sign)
    }
    const addScore = () => {
      playerScore += 1
    }
    return {playerSigns, addSign, getName, getSign, playerScore, addScore, clearSigns}
}

let start = document.querySelector('.start-game');
start.addEventListener('click', () => startGame())

let player1, player2

function startGame() {

  player1 = player(document.getElementById('player1').value, '✕');
  player2 = player(document.getElementById('player2').value, '◯');

  let player1name = document.getElementById('player1name');
  let plater2name = document.getElementById('player2name');

  player1name.textContent = player1.getName();
  player2name.textContent = player2.getName();

  main.classList.toggle('prestart');
  document.getElementById('player1').classList.add('hidden');
  document.getElementById('player2').classList.add('hidden');

  createCells();
  addRestartButton();
  start.classList.add('hidden');
  scores.classList.remove('hidden');
  const restart = document.querySelector('.restart');
  
  restart.addEventListener('click', () => restartGame(cells))

  const cells = document.querySelectorAll('.game-cell');
  cells.forEach ((cell) => {
        cell.addEventListener('click', 
        () => cell.textContent = '◯')
  });

  return player1, player2

}


function restartGame(cells) {
  cells.forEach ((cell) => { 
    gameBoard.board = ['', '', '', '', '', '', '', '', ''];
    //обнулить игроков, обнулить счет, обнулить gameflow, скрыть поле, показать инпуты
    
  });
}

//✕ ◯

function isWin () {

}

function changeScore (player1Score, player2Score) {
    score.textContent=`${player1Score} - ${player2Score}`
}


function endGame(winner) {
    winner.addScore();
    //gameBoard.board.clear();
    player1.clearSigns();
    player2.clearSigns();
    //endgamemessage();
    changeScore(player1.playerScore, player2.playerScore);
    createCells();

}