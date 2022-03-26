let gameBoard = {
    board: ['◯', '✕', '◯', '✕', '◯', '✕', '◯', '✕', '◯'],
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




function createCells() {
      
      const cellGrid = document.createElement('div');
      cellGrid.classList.add('game-field');
      main.appendChild(cellGrid);

      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
        cell.id = i;
        cellGrid.appendChild(cell);
      
      }

      const restartButton = document.createElement('button');
      restartButton.classList.add('restart');
      restartButton.textContent = 'Restart game';
      main.appendChild(restartButton);
      
}



const gameFlow = {

}



const player = (name) => {
    const getName  = () => name;
    let playerSigns = [];
    const addSign = sign => {
        playerSigns.push(sign)
    }
    return {playerSigns, addSign, getName}
}

let start = document.querySelector('.start-game');
start.addEventListener('click', () => startGame())

let player1, player2

function startGame() {

  player1 = player(document.getElementById('player1').value);
  player2 = player(document.getElementById('player2').value);

  let player1name = document.getElementById('player1name');
  let plater2name = document.getElementById('player2name');

  player1name.textContent = player1.getName();
  player2name.textContent = player2.getName();

  main.classList.toggle('prestart');
  document.getElementById('player1').classList.add('hidden');
  document.getElementById('player2').classList.add('hidden');

  createCells();

  start.classList.add('hidden');
  scores.classList.remove('hidden');

  return player1, player2

}



const cells = document.querySelectorAll('.game-cell');

cells.forEach ((cell) => {
        cell.addEventListener('click', 
        () => cell.textContent = '◯')
  });


const restart = document.querySelector('.restart');

restart.addEventListener('click', () => restartGame())

function restartGame() {
  cells.forEach ((cell) => { 
    cell.textContent = ''
  });
}

//✕ ◯

function isWin () {

}

function changeScore (player1Score, player2Score) {
    score.textContent=`${player1Score} - ${player2Score}`
}