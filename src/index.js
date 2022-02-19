import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReduxRouter } from "@lagunovsky/redux-react-router";
import store from "./store";
import { browserHistory } from "./history";
import App from "./components/app/index";
import registerServiceWorker from "./registerServiceWorker";
import startChat from "./chat";



const initialState = {
  username: '',
  chat: {
    poemModal: false,
    usernames: [],
    chatBoxes: [],
    boxesOpen: false,
    prvMsgData: []
  },
  poemRoom: {
    poemPartner: '',
    activateTyping: false,
    whosTurn: '',
    userTextArea: '',
    finalPoem: '',
    turnNumber: 1,
    whoClickedStart: ''
  },
  messages: []

};


const chatStore = store(initialState);

startChat(chatStore);

ReactDOM.render(
  <Provider store={chatStore}>
    <ReduxRouter
      history={browserHistory}
      store={chatStore}
      children={<App />}
    />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
