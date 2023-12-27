
const GameBoard = ({onSelectSquare,board}) => {
    // const [gameBoard,setGameBoard]= useState(initialGameBoard);
    // const handleSelectSquare =(rowIndex,columnIndex)=>{
    //     setGameBoard((previousGameBoard)=>{
    //         const updatedGameBoard= [...previousGameBoard.map((innerArray)=>[...innerArray])]
    //         updatedGameBoard[rowIndex][columnIndex]=activePlayerSymbol;
    //         return updatedGameBoard;
    //     })

    //     onSelectSquare();
    // }
   
    
  return (
    <ol id='game-board'>
       {
              board.map((row,rowIndex)=>(
            <li key={rowIndex}>
                <ol>
                    {
                     row.map((playerSymbol,columnIndex)=>(
                            <li key={columnIndex}>
                                <button
                                 onClick={() => onSelectSquare(rowIndex, columnIndex)}
                                 disabled={playerSymbol!=null}
                                >{playerSymbol}</button>
                            </li>
                        ))}
                </ol>
            </li>
        ))
       }
    </ol>
  )
}

export default GameBoard