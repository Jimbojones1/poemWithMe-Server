import React from 'react';


const PrivateMessageHeader = ({user, removeBox, submitInvite}) => {
  return (
        <header className="top-bar twelve columns">

          <h4 className='prvUserInfo'>{user}</h4>
          <ul id="chatButtonUl">
            <li><i className="fa fa-pencil" aria-hidden="true" onClick={submitInvite.bind(null, user)}>con</i></li>
            <li><i className="fa fa-minus" aria-hidden="true"></i></li>
            <li className='removeButton'><i className="fa fa-times" aria-hidden="true" onClick={removeBox.bind(null, user)}></i></li>
          </ul>
        </header>
    )
}

export default PrivateMessageHeader;
