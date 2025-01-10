const playerInformation = () => {
  let playerAssignments = {
    player1: "",
    player2: "",
  };
  //First we start off with making the player chose if they would like X or O
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
    return playerAssignments;
  };

  //Then we ask player 1 to chose heads or tails, assign to different key in same object
  const makePlayerHeadsOrTails = (userInputForHeadsOrTails) => {
    console.log(`Player 1 is ${playerAssignments.player1}`);
    console.log(`Player 2 is ${playerAssignments.player2}`);
    if (userInputForHeadsOrTails.toLowerCase() === "heads") {
      playerAssignments.player1Coin = "heads";
      playerAssignments.player2Coin = "tails";
    } else if (userInputForHeadsOrTails.toLowerCase() === "tails") {
      playerAssignments.player1Coin = "tails";
      playerAssignments.player2Coin = "heads";
    }
    return playerAssignments;
  };
  //Then we do the coin flip
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

  //Finally we compare the coin flip results to what the players chose to determine starting player.
  const startingPlayer = () => {
    const coinFlipResult = coinFlip();
    if (
      (playerAssignments.player1Coin === "heads" && !coinFlipResult) ||
      (playerAssignments.player1Coin === "tails" && coinFlipResult)
    ) {
      console.log("Player 1 has won the coin flip. Player 1 starts!");
      return "player1";
    } else {
      console.log("Player 2 has won the coin flip. Player 2 starts!");
      return "player2";
    }
  };
  return { makePlayerXO, makePlayerHeadsOrTails, coinFlip, startingPlayer };
};
