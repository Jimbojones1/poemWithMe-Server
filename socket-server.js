const io = require('socket.io');

const usernames = {};


module.exports = function(server){
  const socketServer = io(server);

  socketServer.on('connection', socket => {
    console.log('socket is connected')
    socket.on('setInitialUsername', (username) => {
      console.log(username, ' this is username');
    })

    // socket.emit('message', ['hey baby'])

    socket.on('message', (message) => {
      socket.emit('message', ['jimbo is here'])
    })

    socket.on('disconnect', () => {
          // DELETE the user from our object
          delete usernames[socket.username]
          // the update the users list by firing an event to the react application
          // to update the current users
          socketServer.emit('users', Object.keys(usernames));
    });


  });/// end of connection
};// end of the function
