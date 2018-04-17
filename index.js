const express = require('express');
const app = express();
const chatServer = require('./socket-server');


const server = app.listen(4000, ()=>{
  console.log('server is listening on port 4000');
});


chatServer(server);
