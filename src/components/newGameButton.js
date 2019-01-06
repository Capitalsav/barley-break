import React from 'react';


function NewGameButton(props) {
    return (
        <button className="new-game" onClick={props.onClick}>New Game</button>
    )
}

export default NewGameButton