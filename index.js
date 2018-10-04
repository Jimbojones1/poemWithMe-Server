require('dotenv').config();
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const chatServer = require('./socket-server');
const session    = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
 });

require('./db/db');

const userController = require('./controllers/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//controllers
app.use('/users', userController);

const PORT = 4000;

const server = app.listen(process.env.PORT || PORT, ()=>{
  console.log('server is listening on port 4000');
});


chatServer(server, session);
