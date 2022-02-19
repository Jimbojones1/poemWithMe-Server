import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleUserPoemInput, startPoem } from '../../actions/message-actions';
import RoomUser from './roomUser';
import PoemArea from './poemArea';
import Timer from './timer';
import './styles/style.css';




class PoemRoom extends Component {
  handleInput = (e) => {

    const { handlePoemInput } = this.props;
    handlePoemInput(e.currentTarget.value, true)
  }
  render(){

    const { poemText, startPoem, username } = this.props;

    return (
      <div className='container'>
        <div className='row'>
          <RoomUser/>
          <PoemArea  handlePoemInput={this.handleInput} poemText={poemText}/>
          <Timer startPoem={startPoem} username={username}/>
        </div>
      </div>
      )
  }
}



const mapStateToProps = (state) => {
  // console.log(state, ' this is state in chatroom Container')
  return {
    partner: state.poemRoom.poemPartner,
    username: state.username,
    poemText: state.poemRoom.userTextArea
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startPoem: (whoClicked, sending) => dispatch(startPoem(whoClicked, sending)),
    handlePoemInput: (text, sending) => dispatch(handleUserPoemInput(text, sending))
  }
}


export default connect( mapStateToProps, mapDispatchToProps )( PoemRoom );
