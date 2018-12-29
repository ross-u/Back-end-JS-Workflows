const mongoose = require('mongoose');

//Create a connection to the database named `db-name-goes-here`
mongoose.connect('mongodb://localhost/db-name-goes-here', (err) => {
  if (err) return console.log(err);
  console.log(`Connected to database.`)
});

module.exports = mongoose;