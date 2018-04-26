const io = require('socket.io');
const sharedsession = require("express-socket.io-session");
const usernames = {};

const rooms = [];
let HomeRoomMembers = [];
roomNumbers = 0;

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


      socket.join('home');
      socket.room = 'home';

      HomeRoomMembers.push(username);

      // add the user to the global list of usernames;
      usernames[username] = socket.id;

      socketServer.sockets.emit('updateUsers', HomeRoomMembers);
  });


  socket.on('pm', (msgData) => {
    socketServer.sockets.connected[usernames[msgData.recipient]].emit('pm', msgData)
  });

  socket.on('poeming', (text) => {
    console.log(socket.room, 'socket room in poeming')
    socketServer.to(socket.room).emit('poeming', text)
  });

  socket.on('invite', async (userOne, userTwo) => {

    socket.leave('home');
    socketServer.sockets.sockets[usernames[userTwo]].leave(`${roomNumbers}`)
    console.log(userTwo, userOne, ' this is uerOne and Two')
    HomeRoomMembers = await HomeRoomMembers.filter((username) => username !== userOne && username !== userTwo);
    console.log(HomeRoomMembers, ' this is HomeRoomMembers')
    socketServer.sockets.emit('updateUsers', HomeRoomMembers)

    roomNumbers++
    // console.log(userOne, userTwo, ' these sare the users')
    // console.log(usernames[userOne], usernames[userTwo], ' this is username values should be socket.id');
    // console.log('=================================================================')
    // console.log(socketServer.sockets.sockets[usernames[userTwo]], ' this is socketServer')
    // console.log('=================================================================')

    socket.join(`${roomNumbers}`);
    socketServer.sockets.sockets[usernames[userTwo]].join(`${roomNumbers}`)
    rooms.push({
      id: roomNumbers,
      userOne: usernames[userOne],
      userTwo: usernames[userTwo]
    });

    socket.room = roomNumbers;
    socketServer.sockets.sockets[usernames[userTwo]].room = roomNumbers;



    // console.log(socket.rooms, ' this is socket')
    // console.log('===========================================================')
    // console.log(socketServer.sockets.sockets[usernames[userTwo]].rooms)



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
