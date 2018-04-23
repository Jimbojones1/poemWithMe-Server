const io = require('socket.io');
const sharedsession = require("express-socket.io-session");
const usernames = {};



module.exports = function(server, session){
  const socketServer = io(server);

  // initialize session for socket
  socketServer.use(sharedsession(session, {
    autoSave: true
  }));




  socketServer.on('connection', socket => {




    socketServer.sockets.emit('updateUsers', Object.keys(usernames));

    socket.on('setInitialUsername', (username) => {
      socket.handshake.session.username = username;
      socket.handshake.session.isLoggedIn = false;

      // add the user to the global list of usernames;
      usernames[username] = socket.id;

      socketServer.sockets.emit('updateUsers', Object.keys(usernames));
  });


  socket.on('pm', (msgData) => {
    console.log(msgData, 'in pm')
    console.log(socketServer.sockets.connected, usernames, msgData.recipient, usernames[msgData.recipient], '------------')
    socketServer.sockets.connected[usernames[msgData.recipient]].emit('pm', msgData)
  });


    // socket.emit('message', ['hey baby'])

  socket.on('message', (message) => {
    socket.emit('message', ['jimbo is here'])
  })

  socket.on('disconnect', () => {

        // DELETE the user from our object
        delete usernames[socket.handshake.session.username]
        // the update the users list by firing an event to the react application
        // to update the current users
        socketServer.emit('updateUsers', Object.keys(usernames));
  });


  });/// end of connection
};// end of the function
