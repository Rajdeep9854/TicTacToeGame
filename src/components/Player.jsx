import React from 'react'
import { useState } from 'react'

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
    const[isEditing , setIsEditing ] =useState(false);
    const [playerName,setPlayerName] = useState(initialName)


    const handlePlayerName=()=>{
       // setIsEditing(isEditing ? false : true )
      // setIsEditing(!isEditing);
      setIsEditing(editing=>!editing)// this is the best practice by react 
      if(isEditing){
          onChangeName(symbol, playerName)
      }
    }


    const handleChange = (event)=>{
        setPlayerName(event.target.value)
    }


    let editablePlayerName = <span className='player-name'>{playerName}</span>
    //let btnCaption = "Edit"
    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
        //btnCaption='Save'
    }
    
  return (
            <li className={isActive ? 'active':undefined}>
              <span className='player'>
              {editablePlayerName}
                  <span className='player-symbol'>{symbol}</span>
              </span>
              <button onClick={handlePlayerName}> {isEditing  ? 'Save':'Edit'}</button>
          </li>
           )
}

export default Player