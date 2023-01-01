const menu = document.querySelector('.menu');
const game = document.querySelector('.game');
const playerStart = document.getElementsByName('choosecircleandx');
const buttons = document.querySelector('.cpOrPlayer');
const playerX = document.querySelector('.player-x');
const playerO = document.querySelector('.player-o');
const gameBoard = document.querySelector('.game-action');
const divbox = document.querySelectorAll('.box');
const turn = document.querySelector('.turn');
const resultPlayerWin = document.querySelector('.result');
let wins = document.querySelector('.player-wins');
let loses = document.querySelector('.loses');
let ties = document.querySelector('.ties');
const popUp = document.querySelector('.popup');
const resultmessage = document.querySelector('.whowin');
const restart = document.querySelector('.animation');
const playAgain = document.querySelector('.quitreturn');
const result = document.querySelector('.result');

buttonStartGame();
playerSelected();

function buttonStartGame() {
  buttons.addEventListener('click', e => {
    const isPlayerOrCPU = e.target.classList[0];

    if (isPlayerOrCPU === 'cpu') {
      menu.style.display = 'none';
      game.style.display = 'flex';
      gameBoard.classList.add('x-turn');
    } else if (isPlayerOrCPU === 'player') {
      menu.style.display = 'none';
      game.style.display = 'flex';
      gameBoard.classList.add('x-turn');
      playerSelected();
    }
  });
}

function playerSelected() {
  playerStart.forEach(option => {
    if (option.checked) {
      if (option.id === 'x_text') {
        playerX.innerHTML = 'Player One (X)';
        playerO.innerHTML = 'Player Two (O)';
      } else {
        playerO.innerHTML = 'Player One (O)';
        playerX.innerHTML = 'Player Two (X)';
      }
    }
  });
}

function clickBoard(e) {
  if (gameBoard.classList[1] === 'x-turn') {
    gameBoard.classList.remove('x-turn');
    gameBoard.classList.add('o-turn');
    e.target.classList.add('x');
    turn.childNodes[1].src = 'images/options-O.svg';
  } else {
    gameBoard.classList.remove('o-turn');
    gameBoard.classList.add('x-turn');
    e.target.classList.add('o');
    turn.childNodes[1].src = 'images/options-X.svg';
  }

  const win = wingame(e.target.classList[1]);
  const isDrawGame = isDraw();
  if (win) {
    scoreBoard();
    gameResult();
    markvalues(e.target.classList[1]);
  } else if (isDrawGame) {
    let isnumberofties = Number(ties.innerText);
    popUp.style.display = 'flex';
    resultmessage.childNodes[1].style.display = 'none';
    resultmessage.childNodes[3].innerHTML = 'ROUND TIED';
    resultmessage.childNodes[3].style.color = '#A8BFC9';
    isnumberofties++;
    ties.innerHTML = isnumberofties;
  } else {
    resultmessage.childNodes[1].style.display = 'flex';
    resultmessage.childNodes[3].innerHTML = 'Takes The Round';
  }
}

divbox.forEach(box => {
  box.addEventListener('click', clickBoard, {once: true});
});

// Win conditions
const winconditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Win game
const wingame = currentPlayer => {
  return winconditions.some(combination => {
    return combination.every(index => {
      return divbox[index].classList.contains(currentPlayer);
    });
  });
};

// Mark Who winners

const markvalues = currentPlayer => {
  winconditions.forEach(function (combination) {
    let check = combination.every(index => divbox[index].classList.contains(currentPlayer));
    if (check) {
      markWin(combination);
    }
  });
};

function markWin(combination) {
  combination.forEach(function (index) {
    if (gameBoard.classList[1] === 'o-turn') {
      divbox[index].classList.add('xwinner');
    } else {
      divbox[index].classList.add('owinner');
    }
  });
}

// Score Board

function scoreBoard() {
  if (gameBoard.classList[1] === 'o-turn') {
    let xscore = Number(wins.innerText);
    xscore++;
    wins.textContent = xscore;
  } else {
    let oscore = Number(loses.innerText);
    oscore++;
    loses.textContent = oscore;
  }
}

// Game result PopUp

function gameResult() {
  const text = resultmessage.childNodes[3];
  const imgChange = resultmessage.childNodes[1];
  const isOTurn = gameBoard.classList[1] === 'o-turn';

  if (isOTurn) {
    text.innerText = 'Takes the Round';
    text.style.color = '#31c3bd';
    imgChange.src = 'images/X-result.png';
  } else {
    text.innerText = 'Takes the Round';
    text.style.color = '#f2b137';
    imgChange.src = 'images/O-result.png';
  }

  popUp.style.display = 'flex';
}

// Restart ou Quit Game

restart.addEventListener('click', e => {
  window.location.reload();
});

playAgain.addEventListener('click', e => {
  const option = e.target.textContent;
  if (option === 'NEXT ROUND') {
    divbox.forEach(box => {
      box.classList.remove('x');
      box.classList.remove('o');
      box.classList.remove('xwinner');
      box.classList.remove('owinner');
      box.removeEventListener('click', clickBoard, {once: true});
      box.addEventListener('click', clickBoard, {once: true});
    });
    popUp.style.display = 'none';
    gameBoard.classList.remove('o-turn');
    gameBoard.classList.remove('x-turn');
    gameBoard.classList.add('x-turn');
    turn.childNodes[1].src = 'images/options-X.svg';
  } else if (option === 'QUIT') {
    window.location.reload();
  }
});

// Draw Game

const isDraw = () => {
  return [...divbox].every(box => {
    return box.classList.contains('x') || box.classList.contains('o');
  });
};
