import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addChatBox,  openChatBoxes, hanldePoemModal, emitPrivateMessage, emitPoemInvite } from '../../actions/message-actions';
import UserList from './userList';
import PrivateMessageBox from './privateMessageBox';
import PoemInviteModal from './poemInvitationModal';


class ChatRoom extends Component {
  openChat = (e) => {
    this.props.addChatBox(e.currentTarget.innerText)
    this.props.openChat();

  }
  handleModalAnswer = (e) => {
    console.log('handle Modal Answer is happening', e.currentTarget.innerText)
    const { username, emitPrivateMessage, partner, emitPoemInvite } = this.props;
    console.log('Partner', partner)
    if(e.currentTarget.innerText === 'PoemWithMe') {
      emitPrivateMessage(username, partner, 'accepted poem invite')
      emitPoemInvite(username, partner);

    } else {
      emitPrivateMessage(username, partner, 'sorry, not right now.')
    }


  }
  render(){
    const {usernames, chatBoxesOpen, poemModal} = this.props;

    return (
      <div id="ChatRoom">
        <UserList users={usernames} openChat={this.openChat}/>
        {chatBoxesOpen ? <PrivateMessageBox addChat={this.openChat} /> : null}
        {poemModal ? <PoemInviteModal modal={poemModal} handleAnswer={this.handleModalAnswer} /> : null}
      </div>
      )
  }
}



// state is passed to this function
const mapStateToProps = (state) => {
  // console.log(state, ' this is state in chatroom Container')
  return {
    partner: state.poemRoom.poemPartner,
    username: state.username,
    poemModal: state.chat.poemModal,
    usernames: state.chat.usernames,
    chatBoxesOpen: state.chat.boxesOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addChatBox: (username) => dispatch(addChatBox(username)),
    openChat: () => dispatch(openChatBoxes()),
    hanldePoemModal: () => dispatch(hanldePoemModal()),
    emitPrivateMessage: (username, recipient, message) => dispatch(emitPrivateMessage(username, recipient, message)),
    emitPoemInvite: (username, recipient) => dispatch(emitPoemInvite(username, recipient))
  }
}


export default connect( mapStateToProps, mapDispatchToProps )( ChatRoom );
