const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const chatServer = require('./socket-server');


require('./db/db');

const userController = require('./controllers/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/users', userController);


const server = app.listen(4000, ()=>{
  console.log('server is listening on port 4000');
});


chatServer(server);
