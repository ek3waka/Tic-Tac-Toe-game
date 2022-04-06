Array.prototype.equals = function (array, strict) {
  if (!array)
      return false;

  if (arguments.length == 1)
      strict = true;

  if (this.length != array.length)
      return false;

  for (var i = 0; i < this.length; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
          if (!this[i].equals(array[i], strict))
              return false;
      }
      else if (strict && this[i] != array[i]) {
          return false;
      }
      else if (!strict) {
          return this.sort().equals(array.sort(), true);
      }
  }
  return true;
}

Array.prototype.hasAll = function(a) {
  let hash = this.reduce(function(acc, i) { acc[i] = true; return acc; }, {});
  return a.every(function(i) { return i in hash; });
};

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
    /* addGameboardSign: function (sign, id) {
          gameBoard.board[id] = sign
      } */

}




let scores = document.querySelector('.scores');
const main = document.querySelector('main');
const cellGrid = document.createElement('div');
const restartButton = document.createElement('button');
const popup = document.getElementById("score");
popup.addEventListener('click', () =>  popup.classList.toggle("show"))

function createCells() {
      
      
      cellGrid.classList.add('game-field');
      main.appendChild(cellGrid);

      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
        cell.id = i;
        cell.textContent = gameBoard.board[i];
        cellGrid.appendChild(cell);
      
      }}

function deleteCells() {
  main.removeChild(restartButton)
  while (cellGrid.firstChild) {
    cellGrid.removeChild(cellGrid.firstChild);
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
    const step = () => {

      /* cellGrid.addEventListener('click', function(evt) {
        if(evt.target.closest('.cell')) {
          
          
           
            console.log(evt.target.getAttribute('id'))
        
          }
          }) */
    

      /* createCells() */

    }
    return {playerSigns, getName, getSign, playerScore, addScore, clearSigns, step, addSign}
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
  
  restart.addEventListener('click', () => restartGame())
  /* let participant = player1; */

    cellGrid.addEventListener('click', function(evt) {
    if(evt.target.closest('.game-cell')) {
        player1.addSign(evt.target.getAttribute('id'))
        gameBoard.board[evt.target.getAttribute('id')] = player1.getSign()
        deleteCells();
        createCells();
        addRestartButton();
        isWin(player1)
      }
      })
      

  return player1, player2

}


function restartGame() {
  gameBoard.board = ['', '', '', '', '', '', '', '', ''];
  deleteCells();
  createCells();
  player1.clearSigns();
  player2.clearSigns();
  addRestartButton()
}

//✕ ◯

function isWin(player) {
    for (let i=0; i<gameBoard.winningCombinations.length; i++) {
      if (player.playerSigns.hasAll(gameBoard.winningCombinations[i])) {
        
        popup.classList.toggle("show");
        restartGame()
        break
      } 
    }

      
}

function changeScore (player1Score, player2Score) {
    score.textContent=`${player1Score} - ${player2Score}`
}

/* 
function step(player) {

} */

function endGame(winner) {
    winner.addScore();
    //gameBoard.board.clear();
    player1.clearSigns();
    player2.clearSigns();
    //endgamemessage();
    changeScore(player1.playerScore, player2.playerScore);
    createCells();
  }

