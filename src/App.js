import { useEffect, useState } from "react";
import "./App.css";

function Cell({ xcoor, ycoor, board, setBoard }) {
  const [state, setState] = useState(0);
  const x = xcoor;
  const y = ycoor;

  useEffect(() => {
    setState(board[xcoor][ycoor])
  }, [board])

  const handleClick = (e) => {
    let curr = state === 0 ? 1 : 0;
    setState(curr);

    setBoard(
      board.map((row, xi) =>
        row.map((col, yi) => (xi === x && yi === y ? curr : col))
      )
    );
  };

  return (
    <div
      onClick={handleClick}
      style={{ background: state === 0 ? "white" : "black", height: "50px" }}
    >
      {" "}
      {state}{" "}
    </div>
  );
}

function App() {
  const size = 10;
  const [board, setBoard] = useState(
    Array(10)
      .fill(0)
      .map((x) => Array(10).fill(0))
  );

  let next = Array(size)
    .fill(0)
    .map((x) => Array(size).fill(0));

  const handleNext = () => {
    board.forEach((row, xi) => {
      row.forEach((col, yi) => {
        let c = getNeighborsAlive(xi, yi)
        if (col === 1 && (c === 3 || c === 2)){
          next[xi][yi] = 1
        } 
        else if (col === 0 && (c === 3)){
          next[xi][yi] = 1
        }
        else {
          next[xi][yi] = 0;
        }
      })
    })

    setBoard(board.map((row, xi) =>
        row.map((col, yi) => (next[xi][yi]) )
    ))
  };

  const getCell = (x, y) => {
    if (x >= board.length || x < 0 || y >= board[0].length || y < 0) {
      return 0;
    }
    return board[x][y];
  };

  const getNeighborsAlive = (x, y) => {
    let neighbors =  [-1, 0, 1].map((dx) =>
      [-1, 0, 1].map((dy) =>
        dx === 0 && dy === 0 ? 0 : getCell(x + dx, y + dy)
      )
    );
    return neighbors.reduce((prev, next) => prev + next.reduce((prev, next) => prev+next) , 0)
  };

  return (
    <div
      className="App"
      style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
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
      <button
        onClick={(e) => {
        }}
      >
        {" "}
        mmm{" "}
      </button>
      <button onClick={handleNext}> next </button>
      <button onClick={(e) => {setBoard(board.map((row, xi) =>
        row.map((col, yi) => (xi === 1 && yi === 1 ? (board[xi][yi] === 0 ? 1 : 0) : col))
      )) }}> edit </button>
    </div>
  );
}

export default App;
