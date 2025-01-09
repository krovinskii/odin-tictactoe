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
  const choseCoinSide = () => {
    let userInput = prompt("Player 1, heads or tails?");
    if (userInput.toLowerCase() === "heads") {
      const player1Coin = "heads";
      const player2Coin = "tails";
      console.log(`player 1 = ${player1Coin} -- player 2 = ${player2Coin}`);
      return { player1Coin, player2Coin };
    }
    if (userInput.toLowerCase() === "tails") {
      const player1Coin = "tails";
      const player2Coin = "heads";
      console.log(`player 1 = ${player1Coin} -- player 2 = ${player2Coin}`);
      return { player1Coin, player2Coin };
    }
  };

  //coin flip logic
  const coinFlip = () => {
    let coinFlip = Math.floor(Math.random() * 10);
    if (coinFlip < 5) {
      coinFlip = true;
      console.log("Coin was tails. Under 5.");
      return coinFlip;
    } else {
      coinFlip = false;
      console.log("Coin was heads. Over 5.");
      return coinFlip;
    }
  };

  return { choseCoinSide, coinFlip };
};

//mark starting player X or O
const markStartingPlayer = () => {
  //get player data
  const makePlayer = player();
  const { player1, player2 } = makePlayer.definePlayer();
  console.log(`Player 1 has chosen ${player1}`);

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
      console.log("Player 1 has won the coin flip. Player 1 starts.");
      const startingPlayer = player1;
      console.log(`${startingPlayer} is the starting player.`);
      let secondPlayer = "";
      startingPlayer === "X" ? (secondPlayer = "O") : (secondPlayer = "X");

      return { startingPlayer, secondPlayer };
      //return startingPlayer;
    } else if (
      (player2Coin === "tails" && coinFlipResults === true) ||
      (player2Coin === "heads" && coinFlipResults === false)
    ) {
      console.log("Player 2 has won the coin flip. Player 2 starts.");
      const startingPlayer = player2;
      console.log(`${startingPlayer} is the starting player.`);
      let secondPlayer = "";
      startingPlayer === "X" ? (secondPlayer = "O") : (secondPlayer = "X");
      return { startingPlayer, secondPlayer };
      //return startingPlayer;
    }
  };
  return { startingPlayer1 };
};
const result = markStartingPlayer();
result.startingPlayer1();

//get user selections
const userInputs = () => {
  const grid = [];
  const makeGrid = () => {
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
        console.log(`${winner} wins the game!`);
        break;
      }

      // Switch to the other player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    return winner;
  };

  return alternateTurns();
};

const playGame = userTurns();
playGame.alternateTurns();

//NEED TO CHECK FOR TIES, ALSO NEED TO SET UP CORRECT THE ALTERNATING TURNS SO IT DOESNT SKIP USER!
/*----------------------To Do--------------------------
1. When user clicks on a grid space, that should mark their turn. 
  a. Add variables for each grid
  b. Add event listeners to these variables
      -Event listener should convert the click into the index on the grid, and return the value as an integer to userInput
  c. The gameResults <div> should update with: 
                                              -Whose turn it is
                                              -Who wins the game
                                              -A tie 
  d. The newGame <button> needs functionality. It should reset the grid back to
     null and clear all previous clicks. We could make it easy and just refresh page... lol.