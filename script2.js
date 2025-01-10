const playerInformation = () => {
  let playerAssignments = {
    player1: "",
    player2: "",
    player1Coin: "",
    player2Coin: "",
  };

  // First we start off with making the player choose if they would like X or O
  const makePlayerXO = (userInputForXO) => {
    if (userInputForXO.toLowerCase() === "x") {
      playerAssignments.player1 = "x";
      playerAssignments.player2 = "o";
    } else if (userInputForXO.toLowerCase() === "o") {
      playerAssignments.player1 = "o";
      playerAssignments.player2 = "x";
    } else {
      const userInputWrong = "Please enter X or O";
      console.log(userInputWrong);
      return;
    }
    console.log(playerAssignments);
    return playerAssignments;
  };

  // Added missing makePlayerHeadsOrTails function
  const makePlayerHeadsOrTails = (userInputForHeadsOrTails) => {
    if (userInputForHeadsOrTails.toLowerCase() === "heads") {
      playerAssignments.player1Coin = "heads";
      playerAssignments.player2Coin = "tails";
    } else if (userInputForHeadsOrTails.toLowerCase() === "tails") {
      playerAssignments.player1Coin = "tails";
      playerAssignments.player2Coin = "heads";
    } else {
      const userInputWrong = "Please enter heads or tails";
      console.log(userInputWrong);
      return;
    }
    return playerAssignments;
  };

  // Then we do the coin flip
  const coinFlip = () => {
    let coinFlipResult = Math.floor(Math.random() * 10);
    if (coinFlipResult < 5) {
      coinFlipResult = true;
      console.log("Coin was tails. Under 5");
      return coinFlipResult;
    } else {
      coinFlipResult = false;
      console.log("Coin was heads. Over 5");
      return coinFlipResult;
    }
  };

  // Finally we compare the coin flip results to what the players chose to determine starting player
  const startingPlayer = () => {
    const coinFlipResult = coinFlip();
    if (
      (playerAssignments.player1Coin === "heads" && !coinFlipResult) ||
      (playerAssignments.player1Coin === "tails" && coinFlipResult)
    ) {
      console.log("Player 1 has won the coin flip. Player 1 starts!");
      playerAssignments.startingPlayer = "player1";
      return "player1";
    } else {
      console.log("Player 2 has won the coin flip. Player 2 starts!");
      playerAssignments.startingPlayer = "player2";
      return "player2";
    }
  };

  return {
    makePlayerXO,
    makePlayerHeadsOrTails,
    coinFlip,
    startingPlayer,
    playerAssignments,
  };
};

// Game Logic
const gameBoard = (playerInfo) => {
  let grid = [];

  const makeGrid = () => {
    grid = [];
    for (let i = 0; i < 9; i++) {
      grid.push(null);
    }
    return grid;
  };

  const logInputX = (input) => {
    if (grid[input] === null) {
      grid[input] = "X";
      console.log(`X marked position ${input}`);
      console.log("Current grid:", grid);
    } else {
      console.log(`Position ${input} is already taken`);
      return false;
    }
    return grid;
  };

  const logInputO = (input) => {
    if (grid[input] === null) {
      grid[input] = "O";
      console.log(`O marked position ${input}`);
      console.log("Current grid:", grid);
    } else {
      console.log(`Position ${input} is already taken`);
      return false;
    }
    return grid;
  };

  const checkIfWinner = () => {
    // Check if X wins
    if (
      (grid[0] === "X" && grid[1] === "X" && grid[2] === "X") ||
      (grid[0] === "X" && grid[3] === "X" && grid[6] === "X") ||
      (grid[0] === "X" && grid[4] === "X" && grid[8] === "X") ||
      (grid[2] === "X" && grid[5] === "X" && grid[8] === "X") ||
      (grid[6] === "X" && grid[7] === "X" && grid[8] === "X") ||
      (grid[2] === "X" && grid[4] === "X" && grid[6] === "X") ||
      (grid[3] === "X" && grid[4] === "X" && grid[5] === "X") ||
      (grid[1] === "X" && grid[4] === "X" && grid[7] === "X")
    ) {
      alert("X wins the game!");
      return "X";
    }
    // Check if O wins
    if (
      (grid[0] === "O" && grid[1] === "O" && grid[2] === "O") ||
      (grid[0] === "O" && grid[3] === "O" && grid[6] === "O") ||
      (grid[0] === "O" && grid[4] === "O" && grid[8] === "O") ||
      (grid[2] === "O" && grid[5] === "O" && grid[8] === "O") ||
      (grid[6] === "O" && grid[7] === "O" && grid[8] === "O") ||
      (grid[2] === "O" && grid[4] === "O" && grid[6] === "O") ||
      (grid[3] === "O" && grid[4] === "O" && grid[5] === "O") ||
      (grid[1] === "O" && grid[4] === "O" && grid[7] === "O")
    ) {
      alert("O wins the game!");
      return "O";
    }

    // Check for tie
    const isBoardFull = grid.every((cell) => cell !== null);
    if (isBoardFull) {
      alert("It's a tie!");
      return "tie";
    }

    return false;
  };

  const turns = () => {
    let { startingPlayer, player1, player2 } = playerInfo.playerAssignments;
    let userClick;

    console.log(
      `Starting Player: ${startingPlayer}. Player 1: ${player1} Player 2: ${player2}`
    );

    // Determine first player's mark (X or O)
    if (startingPlayer === "player1" && player1 === "x") {
      startingPlayer += " " + player1;
      console.log(startingPlayer);
      userClick = "x";
    } else if (startingPlayer === "player1" && player1 === "o") {
      startingPlayer += " " + player1;
      console.log(startingPlayer);
      userClick = "o";
    } else if (startingPlayer === "player2" && player2 === "x") {
      startingPlayer += " " + player2;
      console.log(startingPlayer);
      userClick = "x";
    } else if (startingPlayer === "player2" && player2 === "o") {
      startingPlayer += " " + player2;
      console.log(startingPlayer);
      userClick = "o";
    }

    const switchTurn = () => {
      if (userClick === "x") {
        userClick = "o";
        console.log("Switched to O's turn");
      } else {
        userClick = "x";
        console.log("Switched to X's turn");
      }
      return userClick;
    };

    const getCurrentPlayer = () => {
      if (userClick === "x") {
        return player1 === "x" ? "player1" : "player2";
      } else {
        return player1 === "o" ? "player1" : "player2";
      }
    };

    const makeMove = (position) => {
      let result;
      if (userClick === "x") {
        result = logInputX(position);
      } else {
        result = logInputO(position);
      }

      if (result !== false) {
        const winner = checkIfWinner();
        if (!winner) {
          switchTurn();
        }
        return { grid: result, winner };
      }
      return false;
    };

    const getGrid = () => grid;

    return {
      getCurrentPlayer,
      makeMove,
      switchTurn,
      getCurrentMark: () => userClick,
      getGrid,
    };
  };

  makeGrid();

  return { turns };
};

const game = playerInformation();
game.makePlayerXO("x");
game.makePlayerHeadsOrTails("heads");
game.startingPlayer();

const gameboard = gameBoard(game);
const turnController = gameboard.turns();

// Example moves:
console.log("Making move at position 0");
turnController.makeMove(0); // First player marks position 0

console.log("Making move at position 4");
turnController.makeMove(4); // Second player marks position 4

console.log("Current grid state:", turnController.getGrid());
console.log("Current player:", turnController.getCurrentPlayer());
console.log("Current mark:", turnController.getCurrentMark());

//DOM Manipulation-------------------------------------------------------------

const grabElements = () => {
  const markDOM = () => {
    const grids = [];
    for (let i = 0; i <= 8; i++) {
      grids[i] = document.getElementById(`grid${i}`);
    }
    for (let i = 0; i <= 8; i++) {
      grids[i].addEventListener("click", () => {
        turnController.makeMove(i);
        grids[i].textContent = turnController.getCurrentMark().toUpperCase();
      });
    }
  };
  return { markDOM };
};
const placeholder = grabElements();
window.onload = placeholder.markDOM();
