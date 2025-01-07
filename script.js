
const playGame = () => {
  // Grid Creation
  const grid = [];
  
  const makeGrid = () => {
    for (let i = 0; i < 9; i++) {
      grid.push(null);
    }
    return grid;
  };

  // Matches users coordinates with the index
  const logInputX = (input) => {
    // Check if input exists
    if (grid[input] === null) {
      grid[input] = 'X';
    } else {
      alert("You must choose somewhere not picked already.");
    }
    return grid;
  };

  const logInputO = (input) => {
    // Check if input exists
    if (grid[input] === null) {
      grid[input] = 'O';
    } else {
      alert("You must choose somewhere not picked already.");
    }
    return grid;
  };
  // get player 1 or 2 
  const chosePlayer = () => {
    const player1 ="";
    const player2 ="";
    let userChoice = prompt("Please enter if you would like to be X or O");
    if (userChoice === "X") {
      player1 = "X";
      player2 = "O";
      return player1, player2

    }
    if (userChoice === "O") {
       player1 = "O";
       player2 = "X";
       return player1, player2
    }
    
  }
  //player chose coin 
  const choseCoinSide = () => {
    let userInput = prompt("Player 1, heads or tails?");
    if (userInput.toLowerCase === "heads") {
      const player1Coin = "heads";
      const player2Coin = "tails";
      return player1Coin, player2Coin;
    }
    if (userInput.toLowerCase === "tails") {
      const player1Coin = "tails";
      const player2Coin = "heads";
      return player1Coin, player2Coin
    }
  }

  //determine starting player 
  const coinFlip = () => {
    let coinFlip = Math.floor(Math.random() * 10);
    if (coinFlip < 5) {
      coinFlip = true;
      console.log("Coin was tails. Under 5.");
      return coinFlip;
    }
    else {
      coinFlip = false;
      console.log("Coin was heads. Over 5.");
      return coinFlip
    }
  }

  const coinFlipResults = () => {
    if (player1Coin === "heads" && coinFlip === false || player1Coin === "tails" && coinFlip === true) {
      console.log("Player 1 has won the coin flip. Player 1 starts.")
      const startingPlayer = player1;
      return startingPlayer
    }
    else if (player2Coin === "tails" && coinFlip === true || player2Coin === "heads" && coinFlip === false) {
      console.log("Player 2 has won the coin flip. Player 2 starts.");
      const startingPlayer = player2;
      return startingPlayer;
    }
  }
 

  // Checks if there is any winning combination
  const checkIfWinner = () => {
    // Check X wins
    if ((grid[0] === 'X' && grid[1] === 'X' && grid[2] === 'X') ||
        (grid[0] === 'X' && grid[3] === 'X' && grid[6] === 'X') ||
        (grid[0] === 'X' && grid[4] === 'X' && grid[8] === 'X') ||
        (grid[2] === 'X' && grid[5] === 'X' && grid[8] === 'X') ||
        (grid[6] === 'X' && grid[7] === 'X' && grid[8] === 'X') ||
        (grid[2] === 'X' && grid[4] === 'X' && grid[6] === 'X') ||
        (grid[3] === 'X' && grid[4] === 'X' && grid[5] === 'X') ||
        (grid[1] === 'X' && grid[4] === 'X' && grid[7] === 'X')) {
      alert("X wins the game!");
      return true;
    }
    
    // Check O wins
    if ((grid[0] === 'O' && grid[1] === 'O' && grid[2] === 'O') ||
        (grid[0] === 'O' && grid[3] === 'O' && grid[6] === 'O') ||
        (grid[0] === 'O' && grid[4] === 'O' && grid[8] === 'O') ||
        (grid[2] === 'O' && grid[5] === 'O' && grid[8] === 'O') ||
        (grid[6] === 'O' && grid[7] === 'O' && grid[8] === 'O') ||
        (grid[2] === 'O' && grid[4] === 'O' && grid[6] === 'O') ||
        (grid[3] === 'O' && grid[4] === 'O' && grid[5] === 'O') ||
        (grid[1] === 'O' && grid[4] === 'O' && grid[7] === 'O')) {
      alert("O wins the game!");
      return true;
    }
    
    return false;
  };

  return { makeGrid, logInputX, logInputO, checkIfWinner, coinFlip, chosePlayer, coinFlipResults };
  //make grid -> choseplayer -> coinflip -> coinflipresults ->
};

 //to make grid, do const grid = playGame() -- then do grid.makeGrid() to call the object(function) on the new variable to  access it. otherwise will not work.
 const grid = playGame()
 console.log(grid.makeGrid());
 console.log(grid.logInputX(2));


 //Below here is where we are going to restructure the code. I need to seperate into seperate factories. everything up top is mumbo jumbo


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
  return definePlayer;
};

const makeplayer = player();
console.log(makeplayer());

const determineStartingPlayer = () => {
  //player choses heads or tails
  const choseCoinSide = () => {
    let userInput = prompt("Player 1, heads or tails?");
    if (userInput.toLowerCase() === "heads") {
      const player1Coin = "heads";
      const player2Coin = "tails";
      console.log(`player 1 = ${player1Coin} -- player 2 = ${player2Coin}` )
      return {player1Coin, player2Coin};
    }
    if (userInput.toLowerCase() === "tails") {
      const player1Coin = "tails";
      const player2Coin = "heads";
      console.log(`player 1 = ${player1Coin} -- player 2 = ${player2Coin}` )
      return {player1Coin, player2Coin}
    }
  }

  //determine starting player 
  const coinFlip = () => {
    let coinFlip = Math.floor(Math.random() * 10);
    if (coinFlip < 5) {
      coinFlip = true;
      console.log("Coin was tails. Under 5.");
      return coinFlip;
    }
    else {
      coinFlip = false;
      console.log("Coin was heads. Over 5.");
      return coinFlip
    }
  }

  const coinFlipResults = (player1Coin, player2Coin, coinFlip) => {
    if (player1Coin === "heads" && coinFlip === false || player1Coin === "tails" && coinFlip === true) {
      console.log("Player 1 has won the coin flip. Player 1 starts.")
      const startingPlayer = player1;
      return startingPlayer
    }
    else if (player2Coin === "tails" && coinFlip === true || player2Coin === "heads" && coinFlip === false) {
      console.log("Player 2 has won the coin flip. Player 2 starts.");
      const startingPlayer = player2;
      return startingPlayer;
    }
  }
  return {choseCoinSide, coinFlip, coinFlipResults}
}

const playerCoin = determineStartingPlayer();
console.log(playerCoin.choseCoinSide())
console.log(playerCoin.coinFlip());
console.log(playerCoin.coinFlipResults()); // undefined WHY? because it cant access the variables needed. so how do i pass it? it is likely that i need 
                                           // to put coinflip results into another area.. then somehow take the data from player chose coin and player coin flip and then it could work
                                           // as this data somehow only works outside of the functions
console.log("deez nuts boy");
