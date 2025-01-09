//Define the player. Player will either be X or O depending on what they selected in the prompt. Prompt needs to be replaced by UI.
const player = () => {
  const definePlayer = () => {
    let player1 = "";
    let player2 = "";
    let userChoice = prompt("Please enter if you would like to be X or O");
    if (userChoice.toLowerCase() === "x") {
      player1 = "X";
      player2 = "O";
    } else if (userChoice.toLowerCase() === "o") {
      player1 = "O";
      player2 = "X";
    } else {
      return "Invalid choice! Please enter X or O.";
    }
    return { player1, player2 };
  };
  return { definePlayer };
};
//Player selects heads or tails in the prompt. A coin is flipped. The winner gets to start.
const determineStartingPlayer = () => {
  //player choses heads or tails
  const resultsText = document.querySelector(".gameResults");
  const choseCoinSide = () => {
    let userInput = prompt("Player 1, heads or tails?");
    if (userInput.toLowerCase() === "heads") {
      const player1Coin = "heads";
      const player2Coin = "tails";
      resultsText.innerText = `player 1 = ${player1Coin} -- player 2 = ${player2Coin}`;
      return { player1Coin, player2Coin };
    }
    if (userInput.toLowerCase() === "tails") {
      const player1Coin = "tails";
      const player2Coin = "heads";
      resultsText.innerText = `player 1 = ${player1Coin} -- player 2 = ${player2Coin}`;
      return { player1Coin, player2Coin };
    }
  };

  //coin flip logic
  const coinFlip = () => {
    let coinFlip = Math.floor(Math.random() * 10);
    if (coinFlip < 5) {
      coinFlip = true;
      resultsText.innerText = "Coin was tails. Under 5.";
      return coinFlip;
    } else {
      coinFlip = false;
      resultsText.innerText = "Coin was heads. Over 5.";
      return coinFlip;
    }
  };

  return { choseCoinSide, coinFlip };
};

//mark starting player X or O
const markStartingPlayer = () => {
  //get player data
  const resultsText = document.querySelector(".gameResults");
  const makePlayer = player();
  const { player1, player2 } = makePlayer.definePlayer();
  resultsText.innerText = `Player 1 has chosen ${player1}`;

  //get data from other functions and use it here
  const playerCoin = determineStartingPlayer();
  userChosenSide = playerCoin.choseCoinSide();
  coinFlipResults = playerCoin.coinFlip();
  const { player1Coin, player2Coin } = userChosenSide;

  //Get the first player and second player.
  const startingPlayer1 = () => {
    if (
      (player1Coin === "heads" && coinFlipResults === false) ||
      (player1Coin === "tails" && coinFlipResults === true)
    ) {
      resultsText.innerText =
        "Player 1 has won the coin flip. Player 1 starts.";
      const startingPlayer = player1;
      resultsText.innerText = `${startingPlayer} is the starting player.`;
      let secondPlayer = "";
      startingPlayer === "X" ? (secondPlayer = "O") : (secondPlayer = "X");

      return { startingPlayer, secondPlayer };
      //return startingPlayer;
    } else if (
      (player2Coin === "tails" && coinFlipResults === true) ||
      (player2Coin === "heads" && coinFlipResults === false)
    ) {
      resultsText.innerText =
        "Player 2 has won the coin flip. Player 2 starts.";
      const startingPlayer = player2;
      resultsText.innerText = `${startingPlayer} is the starting player.`;
      let secondPlayer = "";
      startingPlayer === "X" ? (secondPlayer = "O") : (secondPlayer = "X");
      return { startingPlayer, secondPlayer };
      //return startingPlayer;
    }
  };
  return { startingPlayer1 };
};

//get user selections
const userInputs = () => {
  const makeGrid = () => {
    const grid = [];
    for (let i = 0; i < 9; i++) {
      grid.push(null);
    }
    return grid;
  };
  const logInputX = (input) => {
    // Check if input exists
    if (grid[input] === null) {
      grid[input] = "X";
    } else {
      alert("You must choose somewhere not picked already.");
      return false;
    }
    return grid;
  };

  const logInputO = (input) => {
    // Check if input exists
    if (grid[input] === null) {
      grid[input] = "O";
    } else {
      alert("You must choose somewhere not picked already.");
      return false;
    }
    return grid;
  };
  const checkIfWinner = () => {
    // Check X wins
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

    // Check O wins
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
    } else {
      return false;
    }
  };
  return { logInputX, logInputO, makeGrid, checkIfWinner };
};

//need to set up alternating turns.. i suppose a loop would work for this until we meet a win condition outlined in userInputs. We can also put the required functions here
//need to create second player. we have starting player, but no logic to tell program that the other will be the second.
// once we have both of the above, we can then create the order in which the game will be played. hopefully.

//Alternating turns and check for wins
const userTurns = () => {
  const result = markStartingPlayer();
  const resultsText = document.querySelector(".gameResults");
  const inputs = userInputs(); // Access the user inputs functions
  const grid = inputs.makeGrid(); // Initialize the grid
  const { startingPlayer, secondPlayer } = result.startingPlayer1();
  let winner = null;

  // Alternate turns until there's a winner
  const alternateTurns = () => {
    let currentPlayer = startingPlayer;

    while (!winner) {
      const userInput = prompt(
        `${currentPlayer}, what space would you like to choose?`
      );
      if (currentPlayer === "X") {
        inputs.logInputX(userInput);
        console.log(grid);
      } else {
        inputs.logInputO(userInput);
      }

      winner = inputs.checkIfWinner();

      if (winner) {
        resultsText.innerText = `${winner} wins the game!`;
        break;
      }

      // Switch to the other player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    return winner;
  };

  return alternateTurns();
};

//const playGame = userTurns();
//playGame.alternateTurns();

/*----------------------To Do--------------------------
1. When user clicks on a grid space, that should mark their turn. 
  a. Add variables for each grid x
  b. Add event listeners to these variables
      -Event listener should convert the click into the index on the grid, and return the value as an integer to userInput
2. The gameResults <div> should update with: 
                                              -Whose turn it is
                                              -Who wins the game
                                              -A tie 
3. The gameResul <button> needs functionality. It should reset the grid back to
     null and clear all previous clicks. We could make it easy and just refresh page... lol.
4. Add logic to check for ties.
5. Fix bug where if user inputs wrong input, it lets them try again. */

const convertToUI = () => {
  const userInputsInConvertToUI = userInputs();
  const grid = userInputsInConvertToUI.makeGrid();
  console.log(grid);
  //Get grid locations, assign them a variable correspoinding to the index of the array
  const grid0 = document.getElementById("grid1");
  const grid1 = document.getElementById("grid2");
  const grid2 = document.getElementById("grid3");
  const grid3 = document.getElementById("grid4");
  const grid4 = document.getElementById("grid5");
  const grid5 = document.getElementById("grid6");
  const grid6 = document.getElementById("grid7");
  const grid7 = document.getElementById("grid8");
  const grid8 = document.getElementById("grid9");

  let userClickLocation = null;

  const getStarter = userTurns();
  const currentPlayer = userTurns.alternateTurns();

  const resultsText = document.querySelector(".gameResults");
  //When grid is clicked, assign that to the index of the grid.
  const grid0Clicked = grid0.addEventListener("click", () => {
    userClickLocation = grid[0];
    grid0.innerText = `${currentPlayer}`;
  });
  const grid1Clicked = grid1.addEventListener("click", () => {
    userClickLocation = grid[1];
    grid1.innerText = `${currentPlayer}`;
  });
  const grid2Clicked = grid2.addEventListener("click", () => {
    userClickLocation = grid[2];
    grid2.innerText = `${currentPlayer}`;
  });
  const grid3Clicked = grid3.addEventListener("click", () => {
    userClickLocation = grid[3];
    grid3.innerText = `${currentPlayer}`;
  });
  const grid4Clicked = grid4.addEventListener("click", () => {
    userClickLocation = grid[4];
    grid4.innerText = `${currentPlayer}`;
  });

  const grid5Clicked = grid5.addEventListener("click", () => {
    userClickLocation = grid[5];
    grid5.innerText = `${currentPlayer}`;
  });
  const grid6Clicked = grid6.addEventListener("click", () => {
    userClickLocation = grid[6];
    grid6.innerText = `${currentPlayer}`;
  });
  const grid7Clicked = grid7.addEventListener("click", () => {
    userClickLocation = grid[7];
    grid7.innerText = `${currentPlayer}`;
  });
  const grid8Clicked = grid8.addEventListener("click", () => {
    userClickLocation = grid[8];
    grid8.innerText = `${currentPlayer}`;
  });

  const newGameLogic = () => {
    userInputsInConvertToUI.makeGrid();
    for (let i = 0; i < 9; i++) {
      const gridElement = document.getElementById(`grid${i + 1}`);
      gridElement.innerText = "";
    }
  };

  const newGameClicked = () => {
    const newGameButton = document.getElementById("newGame");
    newGameButton.addEventListener("click", () => {
      newGameLogic();
      const result = markStartingPlayer();
      result.startingPlayer1();
    });
  };
  return { newGameClicked };
};

const blah = convertToUI();
window.onload = () => {
  blah.newGameClicked();
};
