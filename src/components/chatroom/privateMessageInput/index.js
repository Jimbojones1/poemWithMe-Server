import React from 'react';



const PrivateMessageInput = ({submitMessage, user}) => {
      return (
        <input className="prvSend twelve columns" onKeyPress={submitMessage.bind(this, user)}/>
        )

}


export default PrivateMessageInput;
