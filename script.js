const menu = document.querySelector('.menu');
const game = document.querySelector('.game');
const result = document.querySelector('.popup');
const gameStartTurn = document.querySelector('.game-action');
const isXorCircle = document.getElementsByName('choosecircleandx');
const buttonStart = document.querySelector('.cpOrPlayer');
const back = document.querySelector('.return');
const turn = document.querySelector('.turn');
const box = document.querySelectorAll('.box');
const whowin = document.querySelector('.whowin');
const menuPopUp = document.querySelector('.quitreturn');
const resultMessage = document.querySelector('.result');
const ties = document.querySelector('.ties');
const loses = document.querySelector('.loses');
const wins = document.querySelector('.player-wins');
const playerX = document.querySelector('.player-x');
const playerO = document.querySelector('.player-o');

// Player Or CPU Button

buttonStart.addEventListener('click', e => {
  const isClassList = e.target.classList[0];

  if (isClassList === 'cpu') {
    console.log('Escolheu CPU');
  } else if (isClassList === 'player') {
    gameStartTurn.classList.add('x-turn');
    playersSelected();
    menu.style.display = 'none';
    game.style.display = 'flex';
  }
});

const winneroptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Tic Tac Toe

const handclick = e => {
  const cell = e.target;
  const cellturn = gameStartTurn.classList[1];
  if (cellturn === 'x-turn') {
    cell.classList.add('x');
    gameStartTurn.classList.remove('x-turn');
    gameStartTurn.classList.add('o-turn');
    turn.childNodes[1].src = 'images/options-O.svg';
  } else {
    cell.classList.add('o');
    gameStartTurn.classList.remove('o-turn');
    gameStartTurn.classList.add('x-turn');
    turn.childNodes[1].src = 'images/options-X.svg';
  }

  const isDrawGame = ifDraw();
  if (isDrawGame) {
    let isnumberofties = Number(ties.innerText);
    result.style.display = 'flex';
    resultMessage.innerHTML = '';
    whowin.childNodes[1].style.display = 'none';
    whowin.childNodes[3].innerHTML = 'ROUND TIED';
    whowin.childNodes[3].style.color = '#A8BFC9';
    isnumberofties++;
    ties.innerHTML = isnumberofties;
  }

  checkForwin(e.target.classList[1]);
};

const checkForwin = currentClass => {
  return winneroptions.some(combination => {
    let check = combination.every(index => box[index].classList.contains(currentClass));
    if (check) {
      scoreboard();
      scoreResult(combination);
    }
  });
};

// Winning message

function scoreResult(combination) {
  combination.forEach(idx => {
    const wongame = gameStartTurn.classList[1];
    if (wongame === 'o-turn') {
      whowin.childNodes[1].src = 'images/X-result.png';
      whowin.childNodes[3].style.color = '#31c3bd';
      box[idx].classList.add('xwinner');
    } else {
      whowin.childNodes[1].src = 'images/O-result.png';
      whowin.childNodes[3].style.color = '#f2b137';
      box[idx].classList.add('owinner');
    }
    result.style.display = 'flex';
  });
}

function scoreboard() {
  const wongame = gameStartTurn.classList[1];

  if (wongame === 'o-turn') {
    let xwinsScore = Number(wins.innerText);
    xwinsScore++;
    wins.innerHTML = xwinsScore;
  } else {
    let owinsScore = Number(loses.innerText);
    owinsScore++;
    loses.innerHTML = owinsScore;
  }
}

box.forEach(div => {
  div.addEventListener('click', handclick, {once: true});
});

// Score Player Select

function playersSelected() {
  isXorCircle.forEach(radio => {
    if (radio.checked) {
      if (radio.id === 'x_text') {
        playerX.innerHTML = 'P1';
        playerO.innerHTML = 'P2';
      } else {
        playerX.innerHTML = 'P2';
        playerO.innerHTML = 'P1';
      }
    }
  });
}

// Restart OR Quit
back.addEventListener('click', resetGame);
function resetGame() {
  window.location.reload();
}

menuPopUp.addEventListener('click', e => {
  if (e.target.textContent === 'QUIT') {
    resetGame();
  } else {
    box.forEach(div => {
      div.classList.remove('o');
      div.classList.remove('x');
      div.classList.remove('xwinner');
      div.classList.remove('owinner');
      div.removeEventListener('click', handclick);
      div.addEventListener('click', handclick, {once: true});
    });
    result.style.display = 'none';
    gameStartTurn.classList.remove('o-turn');
    gameStartTurn.classList.remove('x-turn');
    gameStartTurn.classList.add('x-turn');
    turn.childNodes[1].src = 'images/options-X.svg';
  }
});

// If Draw The Game

function ifDraw() {
  return [...box].every(div => {
    return div.classList.contains('x') || div.classList.contains('o');
  });
}
