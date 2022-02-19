import React, { Component } from 'react';


class Timer extends Component {
  render(){

    const { startPoem, username } = this.props;

    return (

      <div className='three columns'>
        <div>
          <h4>Poem Game Info</h4>
          <button onClick={startPoem.bind(null, username, true)}>Start</button>
        </div>
      </div>

      )
  }
}


export default Timer;
