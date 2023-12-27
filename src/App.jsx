import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import LogFrom from "./components/LogFrom";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./WINNIG_COMBINATIONS";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'

  if(gameTurns.length>0 && gameTurns[0].player=="X"){
    currentPlayer="O";
  }
  return currentPlayer;
}
function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player
  }
  return gameBoard;
}
function deriveWinner(gameBoard,player){
  let winner = null;
  for (const COMBINATION of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[COMBINATION[0].row][COMBINATION[0].column]
    const secondSquareSymbol = gameBoard[COMBINATION[1].row][COMBINATION[1].column]
    const thirstSquareSymbol = gameBoard[COMBINATION[2].row][COMBINATION[2].column]


    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirstSquareSymbol) {
      winner = player[firstSquareSymbol];
    }
  }

  return winner;

}

function App() {
  const [player ,setPlayers ] =  useState(
    {
      X : 'Player 1',
      O : 'Player 2'
    })
   const [gameTurns,setGameTurns] = useState([]);
  //const [hasWinner , setHasWinner] = useState(false);
  //const [activePlayer,setActivePlayer]= useState("X");
  const  activePlayer = deriveActivePlayer(gameTurns);
  
  const gameBoard = deriveGameBoard(gameTurns);
 

  const winner = deriveWinner(gameBoard,player)
  const hasDraw = gameTurns.length === 9 && !winner;

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
  function handleReStart (){
    setGameTurns([]);
    
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayer=> {
      return {
        ... prevPlayer,
        [symbol] : newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player  
              initialName="Player 1" 
              symbol="X" 
              isActive={activePlayer==="X"}
              onChangeName = {handlePlayerNameChange}
           />
          <Player 
              initialName="Player 2" 
              symbol="O" 
              isActive={activePlayer === "O"} 
              onChangeName={handlePlayerNameChange}
          />
          
        </ol>
        {(winner || hasDraw ) && <GameOver winner={winner} onReStart={handleReStart}    />}
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
