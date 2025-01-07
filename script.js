
const playGame = () => {
  //Grid Creation
  const grid = [];
    const makeGrid = () => {
      
      for (let i = 0; i < 9; i++) {
        grid.push(null);
      }
      return grid;
    };    
    //matches users coordinates with the index
    const logInputX = (input) => {
      //check if input exists 
      if (grid[input] === null) {
        grid[input] = 'X';
      }
      else {
        alert("You must chose somewhere not picked already.");
      };
      return grid;
    };
    const logInputO = (input) => {
      //check if input exists 
      if (grid[input] === null) {
        grid[input] = 'O';
      }
      else {
        alert("You must chose somewhere not picked already.");
      };
      return grid;

    };
    

    return { makeGrid, logInputX, logInputO };
  }

 //to make grid, do const grid = playGame() -- then do grid.makeGrid() to call the object(function) on the new variable to  access it. otherwise will not work.
 const grid = playGame()
 console.log(grid.makeGrid());
 console.log(grid.logInputX(2));
