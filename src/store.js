import { createStore, applyMiddleware, compose } from 'redux';
import { createRouterMiddleware, createRouterReducer } from '@lagunovsky/redux-react-router';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

// Redux thunk is middleware for Redux that allows you to
// write action creators that return a function instead of an action
import thunk from 'redux-thunk';
import reducers from './reducers/reducer';
import {chatMiddleWare} from './chat';
import loggerMiddleware from './middleware/logger'
// import { composeWithDevToools } from 'redux-devtools-extension';
import { browserHistory } from './history';

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
const enhancers = [];

const rootReducer = reducers

const middleware = [
  createRouterMiddleware(browserHistory),
  thunk,
  chatMiddleWare
 
];

const composedEnhancers = compose(
  applyMiddleware(...middleware)
);


if(process.env.NODE_ENV === 'development'){

    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

};





export default function configureAppStore(preloadedState){
  const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware, thunk, chatMiddleWare],
    preloadedState,
    enhancers: []
  })


  return store
}



