const playerInformation = () => {
  //Object to store players and relevant information
  let playerAssignments = {
    player1: "",
    player2: "",
    player1Coin: "",
    player2Coin: "",
    startingPlayer: "",
  };
  //This makes the player X or O
  const makePlayerXO = (userInputForXO) => {
    if (userInputForXO.toLowerCase() === "x") {
      playerAssignments.player1 = "x";
      playerAssignments.player2 = "o";
    } else if (userInputForXO.toLowerCase() === "o") {
      playerAssignments.player1 = "o";
      playerAssignments.player2 = "x";
    } else {
      console.log("Please enter X or O");
      return;
    }
    return playerAssignments;
  };
  //this records the user choice of heads or tails
  const makePlayerHeadsOrTails = (userInputForHeadsOrTails) => {
    if (userInputForHeadsOrTails.toLowerCase() === "heads") {
      playerAssignments.player1Coin = "heads";
      playerAssignments.player2Coin = "tails";
    } else if (userInputForHeadsOrTails.toLowerCase() === "tails") {
      playerAssignments.player1Coin = "tails";
      playerAssignments.player2Coin = "heads";
    } else {
      console.log("Please enter heads or tails");
      return;
    }
    return playerAssignments;
  };
  //coin flip logic
  const coinFlip = () => {
    let coinFlipResult = Math.floor(Math.random() * 10);
    return coinFlipResult < 5; // true for tails, false for heads
  };
  //records which player starts the game
  const startingPlayer = () => {
    const coinFlipResult = coinFlip(); // true for tails, false for heads
    if (
      (playerAssignments.player1Coin === "heads" && coinFlipResult) ||
      (playerAssignments.player1Coin === "tails" && !coinFlipResult)
    ) {
      playerAssignments.startingPlayer = "player1";
    } else {
      playerAssignments.startingPlayer = "player2";
    }
    return playerAssignments.startingPlayer;
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
  const resetGrid = () => {
    makeGrid();
    console.log(grid);
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
    // Winning combinations
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal
      [2, 4, 6], // Diagonal
    ];

    // Check if X wins
    for (let combo of winningCombinations) {
      if (
        grid[combo[0]] === "X" &&
        grid[combo[1]] === "X" &&
        grid[combo[2]] === "X"
      ) {
        // Delay if X wins due to bug
        setTimeout(() => {
          alert("X wins the game!");
        }, 1000);
        return "X";
      }
    }

    // Check if O wins
    for (let combo of winningCombinations) {
      if (
        grid[combo[0]] === "O" &&
        grid[combo[1]] === "O" &&
        grid[combo[2]] === "O"
      ) {
        // Delay if O wins due to bug
        setTimeout(() => {
          alert("O wins the game!");
        }, 1000);
        return "O";
      }
    }

    // Check for tie
    const isBoardFull = grid.every((cell) => cell !== null);
    if (isBoardFull) {
      setTimeout(() => {
        alert("It's a tie!");
      }, 1000); // 1 second delay for tie
      return "tie";
    }

    return false;
  };

  //Turn logic
  const turns = () => {
    let { startingPlayer, player1, player2 } = playerInfo.playerAssignments;
    let userClick;

    console.log(
      `Starting Player: ${startingPlayer}. Player 1: ${player1} Player 2: ${player2}`
    );

    // Set the initial userClick based on the starting player's assigned X or O
    if (startingPlayer === "player1") {
      userClick = player1;
      console.log(`Starting with Player 1's mark: ${player1}`);
    } else {
      userClick = player2;
      console.log(`Starting with Player 2's mark: ${player2}`);
    }

    const switchTurn = () => {
      userClick = userClick === "x" ? "o" : "x";
      console.log(`Switched to ${userClick.toUpperCase()}'s turn`);
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
      result = userClick === "x" ? logInputX(position) : logInputO(position);

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
      resetGrid,
    };
  };

  makeGrid();

  return { turns };
};

const game = playerInformation();

const gameboard1 = gameBoard(game);
const turnController = gameboard1.turns();

//DOM Manipulation-------------------------------------------------------------

const grabElements = () => {
  const topText = document.getElementById("gameResults");
  const xOInput = document.getElementById("playerSelections");
  const coinInput = document.getElementById("playerSelections");
  const xoSubmitBtn = document.getElementById("submitBtn");
  const coinSubmitBtn = document.getElementById("submitBtn");

  let selectedXO = "";
  let selectedCoin = "";

  const markDOM = () => {
    const grids = [];
    for (let i = 0; i <= 8; i++) {
      grids[i] = document.getElementById(`grid${i}`);
    }
    for (let i = 0; i <= 8; i++) {
      grids[i].addEventListener("click", () => {
        const moveResult = turnController.makeMove(i);
        if (moveResult !== false) {
          const currentGrid = turnController.getGrid();
          grids[i].textContent = currentGrid[i];
        }
      });
    }
  };

  const newGame = () => {
    const newGameButton = document.getElementById("newGame");
    newGameButton.addEventListener("click", () => {
      turnController.resetGrid();
      for (let i = 0; i <= 8; i++) {
        const gridElement = document.getElementById(`grid${i}`);
        gridElement.textContent = "";
      }
      xOInput.style.visibility = "visible";
      coinInput.style.visibility = "visible";
      coinSubmitBtn.style.visibility = "visible";

      player1ChoseXO();
    });
  };

  const player1ChoseXO = () => {
    topText.innerText = "Player 1, X or O?";

    const handleXOInput = () => {
      selectedXO = xOInput.value.trim().toLowerCase();
      xOInput.value = "";

      console.log("Selected XO Value:", selectedXO);

      if (selectedXO === "x" || selectedXO === "o") {
        game.makePlayerXO(selectedXO);
        topText.innerText = `Player 1 chose ${selectedXO.toUpperCase()}!`;

        console.log("Updated playerAssignments:", game.playerAssignments);

        xoSubmitBtn.removeEventListener("click", handleXOInput);

        player1ChoseCoin();
      } else {
        topText.innerText = "Invalid Choice! Please enter X or O.";
      }
    };

    xoSubmitBtn.addEventListener("click", handleXOInput);
  };

  const player1ChoseCoin = () => {
    topText.innerText = "Player 1, Heads or Tails?";

    const handleCoinInput = () => {
      selectedCoin = coinInput.value.trim().toLowerCase();
      coinInput.value = "";

      console.log("Selected Coin Value:", selectedCoin);

      if (selectedCoin === "heads" || selectedCoin === "tails") {
        game.makePlayerHeadsOrTails(selectedCoin);
        topText.innerText = `Player 1 chose ${selectedCoin}!`;
        console.log("Updated playerAssignments:", game.playerAssignments);

        const startingPlayer = game.startingPlayer();
        console.log("Starting player:", startingPlayer);

        topText.innerText = `${startingPlayer} won the coin flip. ${startingPlayer} starts!`;

        xOInput.style.visibility = "hidden";
        coinInput.style.visibility = "hidden";
        coinSubmitBtn.style.visibility = "hidden";

        coinSubmitBtn.removeEventListener("click", handleCoinInput);

        turnController.getCurrentPlayer();
      } else {
        topText.innerText = "Invalid Choice! Please enter Heads or Tails.";
      }
    };

    coinSubmitBtn.addEventListener("click", handleCoinInput);
  };

  return { markDOM, newGame, player1ChoseXO, player1ChoseCoin };
};

const placeholder = grabElements();
window.onload = () => {
  placeholder.markDOM();
  placeholder.newGame();
  placeholder.player1ChoseXO();
};
