// check that this script has been successfully hooked; afterwards, remove the check
// alert('checking here if script is connected.')
// this should alert when opening index.html

const tiles = document.querySelectorAll(".tile");
console.log("tiles", tiles);
const playerx = "X";
const playero = "O";
let turn = playerx;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elements

const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText() {
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

setHoverText();

function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }

  if (turn === playerx) {
    tile.innerText = playerx;
    boardState[tileNumber - 1] = playerx;
    turn = playero;
  } else {
    tile.innerText = playero;
    boardState[tileNumber - 1] = playero;
    turn = playerx;
  }

  setHoverText();
  checkWinner();



  console.log(boardState);
}

// so I'm guessing here you're tyring to do something like
function checkWinner() {
  for (const winningCombination of winningCombinations) {
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];
    const tileValue4 = boardState[combo[3] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3 &&
      tileValue3 === tileValue4
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
    // my code
    // Something similar to this where you're checking if all of
    // them are of the same shape right
    // winningCombination.combo.every((con) => con === winningCombination.combo[0]);
  }

  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

function startNewGame() {
  strike.className = "strike";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = playerx;
  setHoverText();
}

const winningCombinations = [
  { combo: [1, 2, 3, 4], strikeClass: "strike-row-1" },
  { combo: [5, 6, 7, 8], strikeClass: "strike-row-2" },
  { combo: [9, 10, 11, 12], strikeClass: "strike-row-3" },
  { combo: [13, 14, 15, 16], strikeClass: "strike-row-4" },
  { combo: [1, 5, 9, 13], strikeClass: "strike-column-1" },
  { combo: [2, 6, 10, 14], strikeClass: "strike-column-2" },
  { combo: [3, 7, 11, 15], strikeClass: "strike-column-3" },
  { combo: [4, 8, 12, 16], strikeClass: "strike-column-4" },
  { combo: [4, 7, 10, 13], strikeClass: "strike-diagonal-2" },
  { combo: [1, 6, 11, 16], strikeClass: "strike-diagonal-1" },
];
