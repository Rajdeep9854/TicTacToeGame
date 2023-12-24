import React from 'react'

const LogFrom = ({ turns }) => {
    return (<ol id='log'>

        {turns.map((turn) => (
            <li key={`${turn.square.row}${turn.square.column}`}>
                {turn.player} selected row {turn.square.row+1} and column {turn.square.column+1}
            </li>


        ))}
    </ol>)
}

export default LogFrom