import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import LogFrom from "./components/LogFrom";
import { WINNING_COMBINATIONS } from "./WINNIG_COMBINATIONS";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
let winner = null;

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'

  if(gameTurns.length>0 && gameTurns[0].player=="X"){
    currentPlayer="O";
  }
  return currentPlayer;
}


function App() {
  const [gameTurns,setGameTurns] = useState([]);
  //const [hasWinner , setHasWinner] = useState(false);
  //const [activePlayer,setActivePlayer]= useState("X");
  const  activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player
  }


  for (const COMBINATION of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[COMBINATION[0].row][COMBINATION[0].column]
    const secondSquareSymbol = gameBoard[COMBINATION[1].row][COMBINATION[1].column]
    const thirstSquareSymbol = gameBoard[COMBINATION[2].row][COMBINATION[2].column]


    if(firstSquareSymbol && 
      firstSquareSymbol===secondSquareSymbol && 
      firstSquareSymbol === thirstSquareSymbol){
        winner = firstSquareSymbol;
      }
  }

  const handleSelectSquare =(rowIndex,columnIndex)=>{
   //setActivePlayer((currentPlayer)=>(currentPlayer==="X"?"O":"X"))
    setGameTurns(prevTurns=>{
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [
        {
          square : {
                  row:rowIndex,
                  column : columnIndex
                },
          player : currentPlayer

        },

        ...prevTurns
      ]
      
      return updatedTurns;

    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player  initialName="Player 1" symbol="X" isActive={activePlayer==="X"} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
          
        </ol>
        {winner && <p>{winner} won the game </p>}
        <GameBoard
         onSelectSquare={handleSelectSquare} 
         board = {gameBoard}
         />
        </div>
      <LogFrom
        turns={gameTurns}
      />
    </main>
  )
}

export default App
