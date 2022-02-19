import io from 'socket.io-client';
import * as actions from './actions/message-actions';
import { push } from '@lagunovsky/redux-react-router';
let socket = null;

export function chatMiddleWare(store, what){
  return next => action => {
    const result = next(action);

    console.log(action, ' this is action in chatMiddleWare')
    if(socket && action.type === actions.INITIALIZE_USERNAME){
      // send socket emit message
      // console.log('inside if and action.type')
      console.log(action.username, ' usernameeeeee action')
      socket.emit('setInitialUsername', action.username);
      store.dispatch(push('/chat'))
      // store.dispatch()
    } else if (socket && action.type === actions.PM) {

      if(action.message === 'sorry, not right now.'){
         store.dispatch(actions.hanldePoemModal());
       }

      socket.emit('pm', {
                        from: action.username,
                        recipient: action.recipient,
                        message: action.message
                      });
    } else if(socket&& action.type === actions.START_POEM && action.sending){
      console.log('first start_poem')
      socket.emit('start_poem', action.whoClickedStart)


    } else if (socket && action.type === actions.HANDLE_POEM_TEXT && action.sending){


      socket.emit('poeming', action.text)

    } else if (socket && action.type === actions.POEM_INVITE){

       socket.emit('invite', action.username, action.recipient);
       store.dispatch(actions.hanldePoemModal());
       store.dispatch(actions.handlePoemPartner(action.recipient));
       store.dispatch(push('/poemRoom'));
    } else if (socket && action.type === action.START_POEM){

      socket.emit('start_poem',action.whoClickedStart && action.sending);

    }
    return result;
  }
}



export default function(store) {
  socket = io.connect('http://localhost:4000', {  withCredentials: true});

  socket.on('updateUsers', (usernames) => {

    store.dispatch(actions.updateChatUsers(usernames));
  });

  socket.on('pm', ({from, recipient, message}) => {
    console.log('pm', from, recipient, message)

    store.dispatch(actions.updatePrivateMessage(from, recipient, message))

    if(message === 'Would you like to poem with me?'){
      store.dispatch(actions.hanldePoemModal())
      store.dispatch(actions.handlePoemPartner(from))
    } else if(message === 'accepted poem invite'){
       store.dispatch(actions.handlePoemPartner(from))
       store.dispatch(push('/poemRoom'));
    } else {

    }
  });

  socket.on('poeming', (text) => {
    console.log(text, ' text in poeming')
    store.dispatch(actions.handleUserPoemInput(text, false));
  });

  socket.on('start_poem', (whoClickedStart) => {
    console.log('start_poem is happening')
    store.dispatch(actions.startPoem(whoClickedStart, false));
  });

  socket.on('countdown', (time) => {
    console.log(time);
  })

  socket.on('next_round', (round) => {

  });


}
