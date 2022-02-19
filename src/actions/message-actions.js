export const INITIALIZE_USERNAME = "login/INITIALIZE_USERNAME";
export const ADD_RESPONSE        = "login/ADD_RESPONSE";
export const UPDATE_CHAT_USERS   = 'chat/UPDATE_CHAT_USERS';
export const ADD_CHAT_BOX        = 'chat/ADD_CHAT_BOX';
export const CHAT_BOXES_OPEN     = 'chat/BOXES_OPEN';
export const CHAT_BOXES_CLOSED   = 'chat/BOXES_CLOSED';
export const PM                  = 'chat/PM';
export const UPDATE_PRV_MESSAGE  = 'chat/UPDATE_PRV_MESSAGE';
export const HANDLE_POEM_MODAL   = 'chat/HANDLE_POEM_MODAL';
export const HANDLE_POEM_PARTNER = 'chat/HANDLE_POEM_PARTNER';
export const POEM_INVITE         = 'chat/POEM_INVITE';
export const HANDLE_POEM_TEXT    = 'poem/HANDLE_POEM_TEXT';
export const START_POEM          = 'poem/START_POEM'

export function addResponse(message) {
  return { type: ADD_RESPONSE, message };
}


export const initialiazeUsername = (username, route) => ({
  type: INITIALIZE_USERNAME,
  username,
  route
});

export const updateChatUsers = (usernames) => ({
  type: UPDATE_CHAT_USERS,
  usernames
})

export const addChatBox = (username) => ({
  type: ADD_CHAT_BOX,
  username
})

export const openChatBoxes = () => ({
  type: CHAT_BOXES_OPEN
});

export const closeChatBoxes = (user) => ({
  type: CHAT_BOXES_CLOSED,
  user
})

export const emitPrivateMessage = (username, recipient, message) => ({
  type: PM,
  username,
  recipient,
  message
})

export const emitPoemInvite = (username, recipient) => ({
  type: POEM_INVITE,
  username,
  recipient
})

export const updatePrivateMessage = (username, recipient, message) => ({
  type: UPDATE_PRV_MESSAGE,
  username,
  recipient,
  message
})

export const hanldePoemModal = () => ({
  type: HANDLE_POEM_MODAL
})

export const handlePoemPartner = (partner) => ({
  type: HANDLE_POEM_PARTNER,
  partner
})

export const handleUserPoemInput = (text, sending) => ({
  type: HANDLE_POEM_TEXT,
  text,
  sending
})

export const startPoem = (whoClickedStart, sending) => ({
  type: START_POEM,
  whoClickedStart,
  sending
})
