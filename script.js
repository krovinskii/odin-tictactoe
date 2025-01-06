//Grid Creation
const playGame = () => {
    const makeGrid = () => {
      const grid = [];
      for (let i = 0; i < 9; i++) {
        grid.push(i + 1);
      }
      return grid;
    }
    return { makeGrid };
  }