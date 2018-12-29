const mongoose = require('mongoose');
const { dbName } = require('./config');

// Create a connection to the database named `dbName`
mongoose.connect(`mongodb://localhost/${dbName}`, (err) => {
  if (err) return console.log(err);
  console.log(`Connected to the database.`)
});

// Export the database connection 
module.exports = mongoose;