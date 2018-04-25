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
    socketServer.sockets.connected[usernames[msgData.recipient]].emit('pm', msgData)
  });

  socket.on('poeming', (text) => {
    socket.broadcast.emit('poeming', text)
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
