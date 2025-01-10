const playerInformation = () => {
  //First we start off with making the player chose if they would like X or O
  const makePlayerXO = (userInputForXO) => {
    let player1 = "";
    let player2 = "";
    userInputForXO.toLowerCase();
    if (userInputForXO === "x") {
      player1 = "x";
      player2 = "o";
    } else if (userInputForXO === "o") {
      player1 = "o";
      player2 = "x";
    } else {
      const userInputWrong = "Please enter X or O";
      console.log(userInputWrong);
    }
    return { player1, player2 };
  };
  return { makePlayerXO };
};
