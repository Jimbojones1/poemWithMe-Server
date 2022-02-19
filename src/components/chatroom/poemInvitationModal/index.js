import React from 'react';
import './styles/style.css';

const PoemInviteModal = ({modal, handleAnswer}) => {
    return (
      <div id= {modal ? "dialog" : "dialogClosed"}>
        <div id="button-modal">
             <button onClick={handleAnswer}>PoemWithMe</button>
             <button onClick={handleAnswer}>No Bitch</button>
        </div>
      </div>
    )
}


export default PoemInviteModal;
