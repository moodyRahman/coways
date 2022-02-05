import { useEffect, useState } from 'react';
import './App.css';



function Cell ({xcoor, ycoor, board, setBoard}) {
  const [state, setState] = useState(0);
  const x = xcoor
  const y = ycoor

  const handleClick = (e) => {
    console.log(x, y)
    let curr = state === 0 ? 1 : 0
    setState(curr);

    setBoard(board.map((row, xi) => row.map((col, yi) => xi===x&&yi===y?curr:col))) 
  }


  return <div onClick={handleClick} style={{background:state===0?"white":"black", height:"50px"}}> {state} </div>
}



function App() {
  const [board, setBoard] = useState(Array(6).fill(0).map(x => Array(6).fill(0)))
  let next = Array(6).fill(0).map(x => Array(6).fill(0))


  

  return (
    <div className="App" style={{display:"grid", gridTemplateColumns:"repeat(6, 1fr)"}}>
      {board.map((x, xi) => {
        return <>{x.map((y, yi) => {
          return <Cell xcoor={xi} ycoor={yi} 
          board={board} setBoard={setBoard} // really ought be a context ngl 
          />
        })} </>
      })}


      <br />
      <button onClick={(e) => {console.log(board)}}> mmm </button>
    </div>
  );
}

export default App;
