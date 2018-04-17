const mongoose = require('mongoose');


const connectionString = 'mongodb://localhost/poemWithMe';
console.log(connectionString)

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to: ' + connectionString);
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose error! ' + error);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected from: ' + connectionString);
});
