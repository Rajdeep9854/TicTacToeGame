import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/log";
import { useState } from "react"


function App() {
  const [gameTurns,setGameTurns] = useState([]);
  const [activePlayer,setActivePlayer]= useState("X");

  const handleSelectSquare =()=>{
    setActivePlayer((currentPlayer)=>(currentPlayer==="X"?"O":"X"))
    setGameTurns();
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player  initialName="Player 1" symbol="X" isActive={activePlayer==="X"}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
          
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}  />
        <Log />
      </div>
    </main>
  )
}

export default App
