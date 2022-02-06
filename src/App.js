import { useEffect, useState } from "react";
import "./App.css";

function Cell({ xcoor, ycoor, board, setBoard }) {
  const [state, setState] = useState(0);
  const x = xcoor;
  const y = ycoor;

  useEffect(() => {
    setState(board[xcoor][ycoor]);
  }, [board, xcoor, ycoor]);

  const handleClick = (e) => {
    let curr = state === 0 ? 1 : 0;
    setState(curr);

    // search the 2d board array for the element of the array that corresponds
    // to this cell and update it
    setBoard(
      board.map((row, xi) =>
        row.map((element, yi) => (xi === x && yi === y ? curr : element))
      )
    );
  };

  return (
    <div
      onClick={handleClick}
      style={{ background: state === 0 ? "white" : "black", height: "30px" }}
    >
      {state}
    </div>
  );
}

function App() {
  const size = 10;

  // we want the visible board to always reflect this variable, so we make it a state
  const [board, setBoard] = useState(
    Array(10)
      .fill(0)
      .map((x) => Array(10).fill(0))
  );

  // the next generation buffer, copies over to board when the next generation is
  // done calculating
  let next = Array(size)
    .fill(0)
    .map((x) => Array(size).fill(0));

  // for each cell, applys conways rules and put the result into the next array
  const handleNext = () => {
    board.forEach((row, xi) => {
      row.forEach((col, yi) => {
        let c = getNeighborsAlive(xi, yi);
        if (col === 1 && (c === 3 || c === 2)) {
          next[xi][yi] = 1;
        } else if (col === 0 && c === 3) {
          next[xi][yi] = 1;
        } else {
          next[xi][yi] = 0;
        }
      });
    });

    // copy over the next generation into the board array
    setBoard(board.map((row, xi) => row.map((element, yi) => next[xi][yi])));
  };

  // returns 0 if the cell is not in the board, otherwise return the cell
  const getCell = (x, y) => {
    if (x >= board.length || x < 0 || y >= board[0].length || y < 0) {
      return 0;
    }
    return board[x][y];
  };

  // this one was pretty fun to make 🥴
  // go through the 9 possible combinations of delta x and delta y from the
  // parameters x and y
  // if both dx and dy are 0, ignore that cell because we don't want to count the
  // cell in question as a neighbor
  const getNeighborsAlive = (x, y) => {
    // 3 by 3 array containing the values of the 8 neighbors
    let neighbors = [-1, 0, 1].map((dx) =>
      [-1, 0, 1].map((dy) =>
        dx === 0 && dy === 0 ? 0 : getCell(x + dx, y + dy)
      )
    );

    // double reduction to sum the 2d array
    return neighbors.reduce(
      (prev, next) => prev + next.reduce((prev, next) => prev + next),
      0
    );
  };

  return (
    <div
      className="App"
      style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {/* render the board, and give each cell a reference to the board state
      variable so they can update it and it'll inform all references of board */}
      {board.map((x, xi) => {
        return (
          <>
            {x.map((y, yi) => {
              return (
                <Cell
                  xcoor={xi}
                  ycoor={yi}
                  board={board}
                  setBoard={setBoard} // really ought be a context ngl
                />
              );
            })}{" "}
          </>
        );
      })}

      <br />

      <button onClick={handleNext}> next </button>
      <button
        onClick={(e) => {
          setBoard(
            board.map((row, xi) => row.map((element, yi) => 0))
          );
        }}
      >
        {" "}
        clear{" "}
      </button>
    </div>
  );
}

export default App;
