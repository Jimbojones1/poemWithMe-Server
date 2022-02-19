import React from 'react';


const PrivateMessageArea = ({user, prvMsgData, sortMessages}) => {
      // var user = this.props.data
      const filteredData = prvMsgData.filter((data, i) => {
        return data.recipient === user || user === data.from
      })



      const userData = filteredData.map(({from, recipient, message}, i) => {
        return (
          <p key={i}><span className={sortMessages(from)}>{from}</span>: {message}</p>
          )
      });


      return (
         <div className='privateMessage'>
            {userData}
         </div>
        )
}


  export default PrivateMessageArea;
