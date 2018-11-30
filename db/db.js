const mongoose = require('mongoose');


const connectionString = process.env.DB_HOST;
console.log(connectionString)

mongoose.connect(connectionString, { useNewUrlParser: true } );

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to: ' + connectionString);
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose error! ' + error);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected from: ' + connectionString);
});
