const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const board = [
    ['N', 'N', 'N'],
    ['N', 'N', 'N'],
    ['N', 'N', 'N']
]

let currentPlayer = 'X';

readInput = () => {
    return new Promise((resolve, reject) => {
        rl.question(`${currentPlayer}'s move: `, (answer) => {
            resolve(answer);
        });
    });
}

// debug this function 
isGameWon = () => {
    //checkrows
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != "N") {
        winner = board[i][0];
      }
    }
    //checkdiagonal
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != "N") {
      winner = board[0][0];
    }
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != "N") {
      winner = board[0][0];
    }
    //checkvertical
    if (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[0][0] != "N") {
      winner = board[0][0];
    }
    if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1] != "N") {
      winner = board[0][1];
    }
    if (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2] != "N") {
      winner = board[0][2];
    }
}
isBoardFull = () => {
  var cnt = 0;
  for (let i = 0; i < board.length; i++) {
    for (j = 0; j < 3; j++) {
      if (board[i][j] != "N") {
        cnt++;
      }
    }
  }
  if (cnt == 9) {
    gameover = true;
  }
}

printBoard = () => {
  for (x in board) {
    console.log(board[x].toString().replace(/\,+/g, " "));
  }
}
clearBoard = () => {
  for (let i = 0; i < board.length; i++) {
    for (j = 0; j < 3; j++) {
      board[i][j] = "N";
    }
  }
}

playerpos = true;

var winner = "";
var gameover = false;

markCoordinates = (line) => {
  if (board[line.coords[0]][line.coords[1]] == "N") {
    board[line.coords[0]][line.coords[1]] = line.symbol.toUpperCase();
    playerpos = !playerpos;
    currentPlayer = (playerpos == true)?"X":"O";
  }
  else {
    currentPlayer = currentPlayer;
    console.log("Move not allowed!");
  }
  isGameWon();
  isBoardFull();
  if (winner != "") {
    printBoard();
    console.log("The winner is "+ winner);
    clearBoard();
    winner = "";
    gameover = false;
    playGame();
  }
  else if (gameover == true) {
    printBoard();
    console.log('Board\'s full');
    clearBoard();
    gameover = false;
    winner = "";
    playGame();
  }
  else {
    playGame();
  }
}

playGame = () => {
    printBoard();
    let line = readInput().then((message) => {
      if (message.match(/[0-9]+\,[0-9]+/) == null) {
        console.log("Input must be in format 0,0 or 1,1")
        playGame();
        return;
      }      
      var coord1 = message.replace(/\s+/g, "").split(",")[0];
      var coord2 = message.replace(/\s+/g, "").split(",")[1];
      if (parseInt(coord1) > 2 || parseInt(coord2) > 2) {
        console.log("Coordinates out of bounds!");
        playGame();
      }
      else {
        markCoordinates({symbol:currentPlayer, coords:[coord1, coord2]});
      }      
    });
}
console.log("Play the game by typing the coordinate as 0,0 or 1,0 or 2,2")
playGame();
