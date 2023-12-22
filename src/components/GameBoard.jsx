import React, { useState } from 'react'
const initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
const GameBoard = ({onSelectSquare,activePlayerSymbol}) => {
    const [gameBoard,setGameBoard]= useState(initialGameBoard);
    const handleSelectSquare =(rowIndex,columnIndex)=>{
        setGameBoard((previousGameBoard)=>{
            const updatedGameBoard= [...previousGameBoard.map((innerArray)=>[...innerArray])]
            updatedGameBoard[rowIndex][columnIndex]=activePlayerSymbol;
            return updatedGameBoard;
        })

        onSelectSquare();
    }
  return (
    <ol id='game-board'>
       {
            gameBoard.map((row,rowIndex)=>(
            <li key={rowIndex}>
                <ol>
                    {
                     row.map((playerName,columnIndex)=>(
                            <li key={columnIndex}>
                                <button
                                    onClick={()=>handleSelectSquare(rowIndex,columnIndex)}
                                >{playerName}</button>
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